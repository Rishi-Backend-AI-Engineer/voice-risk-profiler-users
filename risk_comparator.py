def compare_risk_profiles(voice_score, questionnaire_score, threshold=0.15):
    if questionnaire_score is None:
        return "No questionnaire data", "Insufficient data for comparison"
    
    diff = abs(voice_score - questionnaire_score)

    if diff < threshold:
        category = "Acceptable"
        explanation = "Voice-based and questionnaire-based scores are aligned."
    elif diff < threshold * 2:
        category = "Moderate"
        explanation = "Some deviation noted between voice and traditional method."
    else:
        category = "Significant"
        explanation = "Significant difference between voice and traditional risk score. Advisor review recommended."
    
    return category, explanation

# Example client data
profile = {
    "client_id": "123e4567-e89b-12d3-a456-426614174000",
    "voice_analysis_score": 0.72,
    "questionnaire_score": 0.56,
}

category, explanation = compare_risk_profiles(
    profile["voice_analysis_score"],
    profile["questionnaire_score"]
)

print("--- Risk Profile Comparison ---")
print(f"Client ID: {profile['client_id']}")
print(f"Comparison Result: {category}")
print(f"Explanation: {explanation}")
