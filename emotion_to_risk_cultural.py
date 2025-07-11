# emotion_to_risk_cultural.py

# Base emotion-to-risk mapping
EMOTION_RISK_MAPPING = {
    "Hesitation": ("behavioral_risk", 0.2),
    "Anxiety": ("emotional_risk", 0.3),
    "Excitement": ("emotional_risk", -0.1),
    "Confidence": ("financial_risk", -0.2),
    "Fear": ("emotional_risk", 0.4),
    "Calmness": ("emotional_risk", -0.2)
}

# Cultural adjustment factors for India
CULTURAL_ADJUSTMENTS_INDIA = {
    "Hesitation": -0.1,     # Reduce impact (may reflect humility, not fear)
    "Confidence": -0.05,    # Slight understatement in tone
    "Anxiety": 0.1          # Amplify (common in formal settings)
}

# Sample detected emotions with intensity
detected_emotions = {
    "Hesitation": 0.7,
    "Anxiety": 0.6,
    "Confidence": 0.3
}

# Step 1: Apply cultural adjustment
adjusted_emotions = {}
for emotion, intensity in detected_emotions.items():
    adjustment = CULTURAL_ADJUSTMENTS_INDIA.get(emotion, 0)
    adjusted_intensity = max(0.0, min(1.0, intensity + adjustment))
    adjusted_emotions[emotion] = adjusted_intensity

# Step 2: Map adjusted emotions to dimension scores
dimension_scores = {
    "financial_risk": 0.0,
    "emotional_risk": 0.0,
    "behavioral_risk": 0.0
}

for emotion, intensity in adjusted_emotions.items():
    if emotion in EMOTION_RISK_MAPPING:
        dimension, weight = EMOTION_RISK_MAPPING[emotion]
        impact = intensity * weight
        dimension_scores[dimension] += impact

# Normalize scores between 0–1
for dim in dimension_scores:
    dimension_scores[dim] = max(0.0, min(1.0, dimension_scores[dim]))

# Output
print("\n--- Emotion-to-Risk with India Cultural Adaptations ---")
print("Adjusted Emotions:", adjusted_emotions)
print("Dimension Scores:")
for dim, score in dimension_scores.items():
    print(f"{dim}: {score:.2f}")
