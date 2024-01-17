import React, { useState } from 'react';
import axios from 'axios';

const AudioRecorder: React.FC = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const startRecording = async () => {
    if (isRecording) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(mediaRecorder);

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        setAudioChunks((prev) => [...prev, event.data]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = () => {
    if (!isRecording || !mediaRecorder) return;

    mediaRecorder.stop();
    setIsRecording(false);
  };

  const handleSubmit = async () => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const formData = new FormData();
      formData.append('file', audioBlob, 'recording.wav');

      try {
        const response = await axios.post('/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Server Response:', response.data);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      <button onClick={startRecording}>녹음 시작</button>
      <button onClick={stopRecording} disabled={!isRecording}>녹음 중지</button>
      <button onClick={handleSubmit} disabled={audioChunks.length === 0}>Submit</button>
    </div>
  );
};
export default AudioRecorder;