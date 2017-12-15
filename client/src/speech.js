const speech = function() {
  const speech = require("@google-cloud/speech");
  const fs = require("fs");

  // Your Google Cloud Platform project ID
  const projectId = "eden-188704";

  // Creates a client
  const client = new speech.SpeechClient({
    projectId: projectId
  });
  // The name of the audio file to transcribe
  const fileName = "./public/Female protagonist 10.m4a";

  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString("base64");

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes
  };
  const config = {
    encoding: "LINEAR16",
    sampleRateHertz: 16000,
    languageCode: "en-US"
  };
  const request = {
    audio: audio,
    config: config
  };
  console.log(request)

  // Detects speech in the audio file
  client
    .recognize(request)
    .then(data => {
      const response = data[0];
      console.log("response", response)
      const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join("\n");
      console.log(`Transcription: ${transcription}`);
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
}

module.exports = speech
