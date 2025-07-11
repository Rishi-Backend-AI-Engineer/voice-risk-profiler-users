from features import extract_emotions_from_voice
from emotion_mapper import map_emotions_to_risk
from emotion_to_risk import compute_weighted_risk
from risk_score_calculator import calculate_risk_score
from profiler_visualizer import visualize_profile

# Step 1: Simulate or extract features from voice
emotions = extract_emotions_from_voice("sample_voice.wav")

# Step 2: Map emotions to risk categories
mapped_risks = map_emotions_to_risk(emotions)

# Step 3: Calculate final risk score (float)
final_score = compute_weighted_risk(mapped_risks)

# Step 4: Use same mapped_risks to calculate category label
final_score, category = calculate_risk_score(mapped_risks)  # <--- pass the dict, not float

# Output
print("Mapped Risk Scores:", mapped_risks)
print("Final Risk Score:", final_score)
print("Risk Category:", category)

# Step 5: Visualize the result
visualize_profile(mapped_risks,final_score)  # or weighted_scores if you visualize the final float too
