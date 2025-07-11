# risk_score_calculator.py

def calculate_risk_score(risk_dims):
    """
    Calculates the final risk score and assigns a category.
    Expects a dict like: {'emotional_risk': 0.6, 'financial_risk': 0.3, ...}
    """

    weights = {
        "financial_risk": 0.25,
        "emotional_risk": 0.25,
        "behavioral_risk": 0.2,
        "demographic_risk": 0.1,
        "scenario_risk": 0.2
    }

    total_score = 0.0
    total_weight = 0.0

    for dim, weight in weights.items():
        total_score += risk_dims.get(dim, 0.0) * weight
        total_weight += weight

    final_score = total_score / total_weight if total_weight > 0 else 0.0

    if final_score >= 0.7:
        category = "High Risk"
    elif final_score >= 0.4:
        category = "Moderate Risk"
    else:
        category = "Low Risk"

    return round(final_score, 2), category
