# emotion_to_risk.py

# --- Mapping Function ---
def map_emotions_to_risk(detected_emotions):
    """
    Maps raw emotion scores to risk dimensions with associated weights.
    Returns a dictionary: {dimension: normalized_score}
    """

    EMOTION_RISK_MAPPING = {
        "Hesitation": ("behavioral_risk", 0.2),
        "Anxiety": ("emotional_risk", 0.3),
        "Excitement": ("emotional_risk", -0.1),
        "Confidence": ("financial_risk", -0.2),
        "Fear": ("emotional_risk", 0.4),
        "Calmness": ("emotional_risk", -0.2)
    }

    dimension_scores = {}

    for emotion, intensity in detected_emotions.items():
        if emotion in EMOTION_RISK_MAPPING:
            dimension, weight = EMOTION_RISK_MAPPING[emotion]
            impact = intensity * weight

            if dimension not in dimension_scores:
                dimension_scores[dimension] = [0.0, 0.0]  # [score_sum, weight_sum]

            dimension_scores[dimension][0] += impact
            dimension_scores[dimension][1] += abs(weight)

    # Normalize each dimension to a score between 0 and 1
    normalized_scores = {}
    for dim, (score, weight) in dimension_scores.items():
        if weight == 0:
            normalized_scores[dim] = 0.0
        else:
            normalized_scores[dim] = max(0.0, min(1.0, score / weight))

    return normalized_scores


# --- Final Risk Score Function ---
def compute_weighted_risk(dimension_scores):
    """
    Calculates final weighted risk score from dimension scores.
    Input: dict like {'emotional_risk': 0.6, 'financial_risk': 0.2, ...}
    Output: single float risk score [0–1]
    """

    weights = {
        "financial_risk": 0.25,
        "emotional_risk": 0.25,
        "behavioral_risk": 0.2,
        "demographic_risk": 0.1,
        "scenario_risk": 0.2
    }

    score = 0.0
    total_weight = 0.0

    for category, value in dimension_scores.items():
        weight = weights.get(category, 0)
        score += value * weight
        total_weight += weight

    if total_weight == 0:
        return 0.0

    return min(max(score / total_weight, 0.0), 1.0)


# --- Debug/Test Run (optional, remove in production) ---
if __name__ == "__main__":
    detected_emotions = {
        "Hesitation": 0.7,
        "Anxiety": 0.6,
        "Confidence": 0.3
    }

    mapped = map_emotions_to_risk(detected_emotions)
    print("\n--- Emotion-to-Risk Mapping Results ---")
    for dim, score in mapped.items():
        print(f"{dim}: {score:.2f}")

    final_score = compute_weighted_risk(mapped)
    print("\nFinal Risk Score:", round(final_score, 2))
