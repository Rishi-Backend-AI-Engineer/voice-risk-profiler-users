import sqlite3
from datetime import datetime

# Connect or create SQLite database
conn = sqlite3.connect("risk.db")
cursor = conn.cursor()

# Create risk_scenarios table
cursor.execute("""
CREATE TABLE IF NOT EXISTS risk_scenarios (
    scenario_id TEXT PRIMARY KEY,
    organization_id TEXT,
    scenario_name TEXT NOT NULL,
    scenario_category TEXT NOT NULL,
    difficulty_level INTEGER,
    scenario_description TEXT NOT NULL,
    scenario_script TEXT NOT NULL,
    expected_reactions TEXT,
    indian_context_relevance TEXT,
    cultural_notes TEXT,
    created_by TEXT,
    is_active BOOLEAN DEFAULT 1,
    is_system_default BOOLEAN DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
)
""")

# Insert sample data
sample_scenarios = [
    ("SCN001", None, "Market Crash", "Financial", 5, "Sudden market drop by 30%.", 
     "How would you react if your portfolio value drops overnight?", 
     "Panic, hesitation, confidence", 
     "Relevant due to 2020 crash", 
     "Some investors trust gold more", 
     "USR001", 1, 1),
    
    ("SCN002", None, "Job Loss", "Income Risk", 4, "Client loses job for 6 months.", 
     "How will you handle financial responsibilities without a job?", 
     "Stress, planning, denial", 
     "Many Indians rely on family", 
     "Joint family safety net", 
     "USR001", 1, 1),
]

cursor.executemany("""
INSERT OR IGNORE INTO risk_scenarios (
    scenario_id, organization_id, scenario_name, scenario_category,
    difficulty_level, scenario_description, scenario_script,
    expected_reactions, indian_context_relevance, cultural_notes,
    created_by, is_active, is_system_default
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
""", sample_scenarios)

# Retrieve and display all scenarios
cursor.execute("SELECT scenario_id, scenario_name, scenario_category, difficulty_level FROM risk_scenarios")
rows = cursor.fetchall()
print("\n--- Risk Scenarios ---")
for row in rows:
    print(f"ID: {row[0]}, Name: {row[1]}, Category: {row[2]}, Difficulty: {row[3]}")

# Commit and close
conn.commit()
conn.close()
