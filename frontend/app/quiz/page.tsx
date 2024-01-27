"use client";
import Sidebar from "@/components/sidebar";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";

const Quiz = () => {
  const { user, error, isLoading } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const router = useRouter();

  const [questions, setQuestions] = useState([]);
  //   setQuestions('''
  //   {
  //     question: "What was the name of the penguin mascot in Club Penguin?",
  //     options: ["Rockhopper", "Sensei", "Gary", "Cadence"],
  //     answer: "Rockhopper",
  //   },
  //   {
  //     question: "Which room is known as the nightclub in Club Penguin?",
  //     options: ["Coffee Shop", "Pizza Parlor", "Dance Club", "Ski Lodge"],
  //     answer: "Dance Club",
  //   },
  //   {
  //     question: "What color is the puffle named 'Flare' in Club Penguin?",
  //     options: ["Red", "Pink", "Orange", "Purple"],
  //     answer: "Red",
  //   },
  //   {
  //     question: "What was the original release year of Club Penguin?",
  //     options: ["2003", "2005", "2007", "2010"],
  //     answer: "2005",
  //   },
  //   {
  //     question:
  //       "Which of these mini-games is related to ice hockey in Club Penguin?",
  //     options: ["Card-Jitsu", "Sled Racing", "Aqua Grabber", "Puffle Roundup"],
  //     answer: "Sled Racing",
  //   },
  //   ''')

  useEffect(() => {
    fetch("http://18.225.6.18:5000/quiz/toys")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option === questions[currentQuestion]?.answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setSelectedOption(null);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleTakeQuizClick = () => {
    router.push("/");
  };

  return (
    <>
      {/* <Sidebar
        setTimeline={handleTimelineNameChange}
        names={timeLineList}
        userid={user.nickname}
        setTimeLineList={setTimeLineList}
      /> */}
      <div className="container mx-auto mt-10 ml-[55vh] w-[80vh]">
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-lg mt-4">
              Your score: {score}/{questions.length}
            </p>
            <button
              className={`bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold py-2 px-4 rounded w-[200px] mt-5`}
              // ${showScore ? (selectedOption === option && "bg-green") : (selectedOption === option && "bg-gray-700")} (showScore ? "bg-gray-600" : "bg-green")
              onClick={handleTakeQuizClick}
            >
              Go Back
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Question {currentQuestion + 1}/{questions.length}
            </h2>
            <h3 className="text-lg">{questions[currentQuestion]?.question}</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {questions[currentQuestion]?.options.map((option, index) => (
                <button
                  key={index}
                  className={`bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-bold py-2 px-4 rounded w-[200px] ${
                    selectedOption === option &&
                    (questions[currentQuestion].answer === option
                      ? "bg-green-600"
                      : "bg-red-500")
                  }`}
                  // ${showScore ? (selectedOption === option && "bg-green") : (selectedOption === option && "bg-gray-700")} (showScore ? "bg-gray-600" : "bg-green")
                  onClick={() => handleOptionSelect(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Quiz;
