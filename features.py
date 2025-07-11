import librosa
import numpy as np

def extract_emotions_from_voice(filepath):
    try:
        y, sr = librosa.load(filepath, sr=None)

        # Basic features
        energy = np.mean(librosa.feature.rms(y=y))
        pitch = librosa.yin(y, fmin=50, fmax=300)
        pitch_mean = np.mean(pitch)
        pitch_std = np.std(pitch)

        # Use these values to mock emotion values
        emotions = {
            "stress": float(np.clip(energy * 10, 0, 1)),
            "confidence": float(np.clip(1 - pitch_std, 0, 1)),
            "anxiety": float(np.clip(pitch_mean / 300, 0, 1)),
            "hesitation": float(np.clip(np.var(pitch), 0, 1)),
            "uncertainty": float(np.clip(pitch_mean / 300, 0, 1))
        }

        return emotions

    except Exception as e:
        print("Error in extract_emotions_from_voice:", e)
        return {
            "stress": 0.5,
            "confidence": 0.5,
            "anxiety": 0.5,
            "hesitation": 0.5,
            "uncertainty": 0.5
        }
