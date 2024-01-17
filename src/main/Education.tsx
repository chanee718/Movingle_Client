import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Education.css';
import { IconButton, Button, Rating } from '@mui/material';
import { Delete, SkipNext, SkipPrevious, CheckCircle, Mic, Stop } from '@mui/icons-material';

const Education: React.FC = () => {
  const location = useLocation();
  const { id, selectedNumber } = location.state || {};
  const [quotes, setQuotes] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vocabulary, setVocabulary] = useState<string[]>([]);

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [animationFrameId, setAnimationFrameId] = useState<number | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const draw = () => {
    if (!canvasRef.current || !analyser) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
  
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    drawVisual(analyser, dataArray, ctx);
  };

  const drawVisual = (analyser: AnalyserNode, dataArray: Uint8Array, ctx: CanvasRenderingContext2D) => {
    if (!canvasRef.current || !isRecording) return;
    const id = requestAnimationFrame(() => drawVisual(analyser, dataArray, ctx));
    setAnimationFrameId(id);

    analyser.getByteFrequencyData(dataArray)

    ctx.fillStyle = "rgb(237, 237, 237)"; // Clear with white background
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    ctx.lineWidth = 1; // Set the line width
    ctx.strokeStyle = "rgb(0, 123, 255)"; // Set the line color
    
    // 막대 간의 간격을 조절할 수 있도록 sliceWidth와 barWidth를 설정
    const barWidth = 2; // 막대의 너비를 2픽셀로 설정
    const spacing = 1; // 막대 사이의 간격을 1픽셀로 설정
    const sliceWidth = barWidth + spacing;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const value = dataArray[i] / 255.0;
      const barHeight = value * canvasRef.current.height;
      const adjustedX = x + (sliceWidth - barWidth) / 2;
      ctx.beginPath();
      ctx.moveTo(adjustedX, canvasRef.current.height / 2 - barHeight / 2); // Start at the middle minus half the bar height
      ctx.lineTo(adjustedX, canvasRef.current.height / 2 + barHeight / 2); // Draw to the middle plus half the bar height
      ctx.stroke();

      // Move to the next position, including spacing
      x += sliceWidth;
    }
  };

  useEffect(() => {
    // AudioContext와 AnalyserNode 초기화
    if (!audioContext) {
      const newAudioContext = new AudioContext();
      const newAnalyser = newAudioContext.createAnalyser();
      newAnalyser.fftSize = 2048;
      setAudioContext(newAudioContext);
      setAnalyser(newAnalyser); 
    }
    }, [audioContext]);

  useEffect(() => {
    const fetchMovieinfo = async () => {
      try {
        const endpoint: string = `http://172.10.7.55:80/quotes/getQuotes?contentsId=${id}&number=${selectedNumber}`;
        const response = await axios.get(endpoint);
        setQuotes(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchMovieinfo();
  }, [id, selectedNumber]);

  const stopVisual = () => {
    // 애니메이션 프레임 루프를 취소합니다.
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      setAnimationFrameId(null);
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // 캔버스를 초기화합니다.
      }
    }
  };

  useEffect(() => {
    if (isRecording) {
      // 녹음이 시작되면 웨이브폼 그리기 시작
      draw();
    } else {
      // 녹음이 중지되면 웨이브폼 그리기 중지
      stopVisual();
    }
  }, [isRecording]);

  const startRecording = () => {
    // AudioContext 상태 확인 및 필요시 재개
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume();
    }
  
    // 사용자의 오디오 스트림을 가져옵니다.
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream: MediaStream) => {
      const source = audioContext!.createMediaStreamSource(stream);
      source.connect(analyser!);
      const newMediaRecorder = new MediaRecorder(stream);
      setMediaRecorder(newMediaRecorder);
  
      newMediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data.size > 0 && newMediaRecorder.state === "inactive") {
          setAudioUrl(URL.createObjectURL(event.data));
        }
      };
  
      newMediaRecorder.start();
      setIsRecording(true);
      draw();
    }).catch(err => {
      console.error('Error starting recording:', err);
    });
  };
  
  const stopRecording = () => {
    // 미디어 레코더를 멈춥니다.
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach(track => track.stop());
      mediaRecorder.ondataavailable = async (event: BlobEvent) => {
        if (event.data.size > 0) {
          setAudioBlob(event.data);
          setAudioUrl(URL.createObjectURL(event.data));
          await submitAudioForEvaluation(event.data);
        }
      };
    }
    setIsRecording(false);
    stopVisual(); // 웨이브폼 그리기를 중지합니다.
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length); // 다음 명대사로 인덱스 업데이트
    setAudioUrl(null);
    setPronunciationScore(null); // 발음 점수 초기화
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1) % quotes.length); // 다음 명대사로 인덱스 업데이트
    setAudioUrl(null);
    setPronunciationScore(null); // 발음 점수 초기화
  };

  const highlightWord = (text: string) => {
    return text.split(" ").map((word, index, wordsArray) => (
      <React.Fragment key={index}>
        <span className="word" onClick={() => addWordToVocabulary(word)}>{word}</span>
        {index < wordsArray.length - 1 && <span> </span>}
      </React.Fragment>
    ));
  };

  const addWordToVocabulary = (word: string) => {
    // 대문자를 소문자로 변환
    let processedWord = word.toLowerCase();
  
    // 특수 문자 제거 (영어 알파벳과 숫자만 남김)
    processedWord = processedWord.replace(/[^a-z0-9']/gi, '');
  
    // 중복된 단어를 추가하지 않도록 체크
    if (!vocabulary.includes(processedWord)) {
      setVocabulary([...vocabulary, processedWord]);
    }
  };

  const removeWordFromVocabulary = (word: string) => {
    setVocabulary(vocabulary.filter(w => w !== word));
  };

  const submitAudioForEvaluation = async (blob: Blob) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('audio', blob);
    formData.append('quote', quotes[currentIndex].quote);

    try {
        const response = await axios.post('http://172.10.7.55:80/education/evaluate', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        // 서버로부터 받은 응답 처리
        console.log(response.data);
        setPronunciationScore(response.data.body.return_object.score);
        console.log(response.data.body.return_object.score);
    } catch (error) {
        console.error('Error submitting audio:', error);
    } finally {
      setIsLoading(false);
    }
};

  const handleSubmit = async () => {
    const userEmail = localStorage.getItem('loginMail') || sessionStorage.getItem('loginMail');
    const history = {
      'userEmail': userEmail,
      'id': id,
      'num': selectedNumber,
    };

    try {
      // 서버에 로그인 요청 보내기
      await axios.post('http://172.10.7.55:80/education/addHistory', history);
      await axios.post('http://172.10.7.55:80/education/addword', {
        'user_email': userEmail,
        'word': vocabulary
      });
      alert('Lesson Completed!');
      navigate('/'); 
  } catch (error) {
      console.log(error);
  }
    
  };

  return (
    <div className='container'>
      <div className='sentence-box'>
        <h2 className='sent-title'>Sentence #{currentIndex + 1}</h2>
        {quotes[currentIndex] && (
          <p className='quote'>{highlightWord(quotes[currentIndex].quote)}</p>
        )}
        <div className='sentline'>
          <hr style={{width: '90%'}}/>
        </div>
        <div className='listen'>
          {audioUrl && <audio src={audioUrl} controls style={{ display: !isRecording ? 'inline' : 'none' }} />}
        </div>
        <div className='evaluation'>
          <h2 className='eval'>Pronunciation Feedback</h2>
          <canvas ref={canvasRef} width="300" height="75" style={{ display: isRecording ? 'inline' : 'none' }}></canvas>
          {isLoading ? (
            <p>Evaluating...</p> // 로딩 중 표시
          ) : (
            pronunciationScore !== null && (
              //<p style={{ display: !isRecording ? 'inline' : 'none' }}>Your Pronunciation Score: {pronunciationScore}</p> // 점수 표시
              <div className='rating'>
                <Rating name="read-only" value={pronunciationScore} precision={0.01} readOnly max={5} size="large" />
                <p className='yourscore'>{Number.parseFloat(pronunciationScore.toString()).toFixed(2)} / 5</p>
              </div>
            )
          )}
        </div>
        <div className='record'>
          {!isRecording ? (
            <Button 
              variant="contained" 
              startIcon={<Mic />}
              onClick={startRecording}
              sx={{
                bgcolor: '#BF4F4F',
                '&:hover': {
                  bgcolor: '#A93228', // 호버 시의 배경색상
                },
              }}
            >
              Record
            </Button>
          ) : (
            <Button 
              variant="contained" 
              startIcon={<Stop />}
              onClick={stopRecording}
              sx={{
                borderColor: '#BF4F4F',
                bgcolor: '#FFFFFF',
                color: '#BF4F4F',
                '&:hover': {
                  color: '#A93228',
                  borderColor: '#A93228',
                  bgcolor: '#FFFFFF',
                },
              }}
            >
              Stop
            </Button>
          )}
        </div>
        <div className='next'>
          {currentIndex < quotes.length - 1 && (
            <Button
              variant="contained" 
              endIcon={<SkipNext />} 
              onClick={handleNext} 
              sx={{
                bgcolor: 'rgb(64, 64, 105)',
                '&:hover': {
                  bgcolor: 'rgb(49, 49, 88)', // 호버 시의 배경색상
                },
              }}
            >
              Next
            </Button>
          )}
          {currentIndex === quotes.length - 1 && (
            <Button
              variant="contained" 
              endIcon={<CheckCircle />} 
              onClick={handleSubmit}
              sx={{
                bgcolor: 'rgb(64, 64, 105)',
                '&:hover': {
                  bgcolor: 'rgb(49, 49, 88)', // 호버 시의 배경색상
                },
              }}
            >
              Complete
            </Button>
          )}
        </div>
        <div className='previous'>
          {currentIndex > 0 && (
            <Button
              variant="contained" 
              startIcon={<SkipPrevious />} 
              onClick={handlePrevious} 
              sx={{
                bgcolor: 'rgb(64, 64, 105)',
                '&:hover': {
                  bgcolor: 'rgb(49, 49, 88)', // 호버 시의 배경색상
                },
              }}
            >
              Back
            </Button>
          )}
        </div>
      </div>
      <div className='vocabulary'>
        <h2 className='vocab-title'>Vocabulary</h2>
        <div className='vocabline' >
          <hr style={{width: '90%'}} />
        </div>
        <ul className='list'>
          {vocabulary.map((word, index) => (
            <li key={index}>
              <span className="listedword">{word}</span>
              <IconButton aria-label="delete" color="error" onClick={() => removeWordFromVocabulary(word)}>
                <Delete />
              </IconButton>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Education;