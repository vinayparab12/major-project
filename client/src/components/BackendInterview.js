import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FrontendInterview.css"; // Import your CSS file

const QuestionList = ({ questions, onQuestionClick }) => {
  return (
    <div className="question-list">
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id} onClick={() => onQuestionClick(question.id)}>
            Question {question.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

const BackendInterview = () => {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [speechToText, setSpeechToText] = useState("");
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] =
    useState(false);
  const [answers, setAnswers] = useState({
    1: "",
    2: "",
    3: "",
  });

  const questions = [
    { id: 1, content: "What is ER Model?" },
    { id: 2, content: "Explain RDBMS" },
    { id: 3, content: "What is a Distributed Database?" },
  ];

  useEffect(() => {
    let recognition;

    if (isSpeechRecognitionActive) {
      // Initialize speech recognition when the component mounts or when isSpeechRecognitionActive changes to true
      recognition = new window.webkitSpeechRecognition(); // Use the appropriate vendor prefix
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");

        setSpeechToText(transcript);          
      };

      // Handle errors
      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsSpeechRecognitionActive(false); // Stop speech recognition on error
      };

      // Start speech recognition
      recognition.start();
    } else {
      if (recognition) {
        // Stop speech recognition when isSpeechRecognitionActive changes to false
        recognition.stop();
      }
    }

    // Clean up when the component unmounts or when isSpeechRecognitionActive changes to false
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, [selectedQuestion, isSpeechRecognitionActive]); // Trigger speech recognition when the selected question changes or isSpeechRecognitionActive changes


  const handleQuestionClick = (questionId) => {
    // Allow navigation only to the next question
    if (questionId === selectedQuestion + 1) {
      setSelectedQuestion(questionId);
      setSpeechToText(""); // Clear speech-to-text output when moving to the next question
    }
  };

  const handleNextPage = () => {
    // Store the answer for the current question
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [selectedQuestion]: speechToText,
    }));
  
    // Allow navigation only if the current question has been attempted
    if (selectedQuestion < questions.length) {
      setSelectedQuestion(selectedQuestion + 1);
      setSpeechToText(""); // Clear speech-to-text output when moving to the next question
    }
  };

  const handleStartSpeechRecognition = () => {
    setIsSpeechRecognitionActive(true);
  };

  const handleStopSpeechRecognition = () => {
    setIsSpeechRecognitionActive(false);
  };

  const handleTextareaChange = (e) => {
    setSpeechToText(e.target.value);
  };

  const handleSubmitInterview = async () => {
    try {
      const isConfirmed = window.confirm(
        "Are you sure you want to submit the interview?"
      );
  
      if (isConfirmed) {
        // Iterate through each question
        for (let i = 1; i <= questions.length; i++) {
          const answer = answers[i];
          
          // Make a fetch request to store each answer
          const response = await fetch('/store-answer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers: answer }),
          });
      
  
          if (!response.ok) {
            // If an error occurs, log the error message and break out of the loop
            console.error(`Error storing answer for question ${i}:`, response.statusText);
            break;
          }
        }
  
        // After all answers have been successfully stored, navigate to the dashboard
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error submitting interview:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="frontend-interview-container form-container">
      <QuestionList
        questions={questions}
        onQuestionClick={handleQuestionClick}
      />
      <div className="main-content form-box">
        <h1 className="form-title">Backend Interview Questions</h1>
        <div>
          <h2>Question {selectedQuestion}</h2>
          <p>{questions.find((q) => q.id === selectedQuestion)?.content}</p>
          <textarea
            className="form-group"
            value={speechToText}
            onChange={handleTextareaChange}
            placeholder="Speech-to-Text Output"
            style={{
              width: "1000px", // Set the desired width
              height: "150px",
              overflowY: "scroll",
              whiteSpace: "pre-wrap",
            }}
          />

          <button
            className="form-group button"
            onClick={handleStartSpeechRecognition}
          >
            Start Speech
          </button>
          <button
            className="form-group button"
            onClick={handleStopSpeechRecognition}
          >
            Stop Speech
          </button>
          {selectedQuestion <= questions.length}{
            <button className="form-group button" onClick={handleNextPage}>
              Submit Answer
            </button>
          }
            <button
              className="form-group button"
              onClick={handleSubmitInterview}
            >
              Submit Interview
            </button>
         
        </div>
      </div>
    </div>
  );
};

export default BackendInterview;
