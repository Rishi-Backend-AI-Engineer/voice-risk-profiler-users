async function uploadFile() {
  const fileInput = document.getElementById("voiceFile");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a .wav file.");
    return;
  }

  // Upload
  const formData = new FormData();
  formData.append("file", file);

  const uploadResponse = await fetch("http://127.0.0.1:5000/upload", {
    method: "POST",
    body: formData,
  });

  const uploadData = await uploadResponse.json();
  const filename = uploadData.filename;

  // Extract Features & Analyze
  const analysisResponse = await fetch("http://127.0.0.1:5000/extract_features", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename }),
  });

  const analysis = await analysisResponse.json();
  document.getElementById("result").innerText =
    `Risk Score: ${analysis.risk_score}, Category: ${analysis.category}`;
}
