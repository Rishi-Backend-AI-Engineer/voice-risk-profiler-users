from datetime import datetime
import sys
import io

# Force stdout to use UTF-8 encoding (for Windows)
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')


client_data = {
    "client_id": "123e4567-e89b-12d3-a456-426614174000",
    "consent_received": True,
    "overall_risk_score": 0.63,
    "profile_date": "2025-06-09",
    "risk_category": "Moderate",
    "advisor_id": "user-789",
    "questionnaire_score": None,
    "voice_analysis_score": 0.65,
    "confidence_level": 0.83,
    "compliance_flags": []
}

def run_compliance_checks(profile):
    flags = []

    if not profile.get("consent_received"):
        flags.append("Consent not received")
    if not 0.0 <= profile.get("overall_risk_score", 0) <= 1.0:
        flags.append("Overall risk score out of bounds")
    if profile.get("confidence_level", 0) < 0.6:
        flags.append("Low confidence in profile result")
    if not profile.get("advisor_id"):
        flags.append("Missing advisor ID")
    for field in ["risk_category", "profile_date", "client_id"]:
        if not profile.get(field):
            flags.append(f"Missing required field: {field}")
    try:
        date_obj = datetime.strptime(profile.get("profile_date"), "%Y-%m-%d")
        if (datetime.now() - date_obj).days > 365:
            flags.append("Profile is over 1 year old – needs review")
    except Exception:
        flags.append("Invalid profile_date format")

    return flags

client_data["compliance_flags"] = run_compliance_checks(client_data)

print("\n--- Regulatory Compliance Report ---")
if client_data["compliance_flags"]:
    for flag in client_data["compliance_flags"]:
        print("FAIL:", flag)
else:
    print("PASS: All regulatory checks passed.")
