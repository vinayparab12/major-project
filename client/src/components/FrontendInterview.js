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

const FrontendInterview = () => {
  const navigate = useNavigate();
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [speechToText, setSpeechToText] = useState("");
  const [isSpeechRecognitionActive, setIsSpeechRecognitionActive] =
    useState(false);

  const questions = [
    { id: 1, content: "What is DBMS?" },
    { id: 2, content: "Where is it used?" },
    { id: 3, content: "Give me advantages and disadvantages of DBMS." },
    { id: 4, content: "What are the functions in DBMS?" },
    { id: 5, content: "Have you done any software-based project?" },
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

  const handleSubmitInterview = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to submit the interview?"
    );

    if (isConfirmed) {
      // Handle the submission of the interview, you can add your logic here

      // Redirect to the dashboard after submitting the interview
      navigate("/dashboard");
    }
  };

  return (
    <div className="frontend-interview-container form-container">
      <QuestionList
        questions={questions}
        onQuestionClick={handleQuestionClick}
      />
      <div className="main-content form-box">
        <h1 className="form-title">Frontend Interview Questions</h1>
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
          {selectedQuestion < questions.length ? (
            <button className="form-group button" onClick={handleNextPage}>
              Next Page
            </button>
          ) : (
            <button
              className="form-group button"
              onClick={handleSubmitInterview}
            >
              Submit Interview
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FrontendInterview;
