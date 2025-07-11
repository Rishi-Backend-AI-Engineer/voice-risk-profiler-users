from flask import Flask, request, jsonify
import whisper
import os

from features import extract_emotions_from_voice
from emotion_mapper import map_emotions_to_risk
from emotion_to_risk import compute_weighted_risk
from risk_score_calculator import calculate_risk_score

app = Flask(__name__)

# Load Whisper model only once
whisper_model = whisper.load_model("base")

UPLOAD_DIR = "../uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_voice():
    if "question" not in request.files or "answer" not in request.files:
        return jsonify({"error": "Please provide both 'question' and 'answer' audio files."}), 400

    # Save uploaded files
    question_file = request.files["question"]
    answer_file = request.files["answer"]

    question_path = os.path.join(UPLOAD_DIR, question_file.filename)
    answer_path = os.path.join(UPLOAD_DIR, answer_file.filename)

    question_file.save(question_path)
    answer_file.save(answer_path)

    return jsonify({
        "message": "Files uploaded successfully.",
        "question_filename": question_file.filename,
        "answer_filename": answer_file.filename
    })

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    question_filename = data.get("question_filename")
    answer_filename = data.get("answer_filename")

    if not question_filename or not answer_filename:
        return jsonify({"error": "Both filenames must be provided in JSON body."}), 400

    question_path = os.path.join(UPLOAD_DIR, question_filename)
    answer_path = os.path.join(UPLOAD_DIR, answer_filename)

    if not os.path.exists(question_path) or not os.path.exists(answer_path):
        return jsonify({"error": "One or both files not found. Upload first."}), 404

    # Step 1: Transcribe question & answer
    question_result = whisper_model.transcribe(question_path)
    answer_result = whisper_model.transcribe(answer_path)
    question_text = question_result["text"]
    answer_text = answer_result["text"]

    # Step 2: Extract emotions from answer
    emotions = extract_emotions_from_voice(answer_path)

    # Step 3: Map to risk
    mapped_risks = map_emotions_to_risk(emotions)

    # Step 4: Compute weighted risk score
    weighted_risk = compute_weighted_risk(mapped_risks)

    # Step 5: Compute final score and category
    final_score, category = calculate_risk_score(mapped_risks)

    return jsonify({
        "question_transcript": question_text,
        "answer_transcript": answer_text,
        "emotions": emotions,
        "mapped_risks": mapped_risks,
        "risk_score": round(final_score, 2),
        "category": category
    })


if __name__ == "__main__":
    app.run(debug=True)
