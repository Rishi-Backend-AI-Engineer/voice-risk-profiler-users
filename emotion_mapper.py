# emotion_mapper.py

def map_emotions_to_risk(emotions):
    """
    Convert emotion levels to risk dimension scores.
    Example input:
    {
        'stress': 0.7,
        'anxiety': 0.6,
        'hesitation': 0.4,
        'confidence': 0.8,
        'uncertainty': 0.5
    }
    """
    return {
        'financial_risk': round(emotions.get('anxiety', 0.5), 2),
        'emotional_risk': round(emotions.get('stress', 0.5), 2),
        'behavioral_risk': round(emotions.get('hesitation', 0.5), 2),
        'demographic_risk': 0.3,  # Or based on user profile
        'scenario_risk': round(emotions.get('uncertainty', 0.5), 2)
    }
