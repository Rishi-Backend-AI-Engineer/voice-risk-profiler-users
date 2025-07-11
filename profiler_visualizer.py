# profiler_visualizer.py

import plotly.graph_objects as go

def visualize_profile(emotion_scores, risk_score):
    emotions = list(emotion_scores.keys())
    scores = list(emotion_scores.values())

    fig = go.Figure()

    fig.add_trace(go.Bar(
        x=emotions,
        y=scores,
        name='Emotion Scores',
        marker_color='indigo'
    ))

    fig.add_trace(go.Scatter(
        x=[emotions[-1]],
        y=[risk_score],
        mode='markers+text',
        marker=dict(size=12, color='red'),
        text=["Overall Risk Score"],
        textposition="top center",
        name='Risk Score'
    ))

    fig.update_layout(
        title='Voice-Based Risk Profile',
        xaxis_title='Emotions',
        yaxis_title='Score',
        template='plotly_white'
    )

    fig.show()
