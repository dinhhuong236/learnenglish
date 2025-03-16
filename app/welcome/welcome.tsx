import React, { useState, useEffect  } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

// Định nghĩa kiểu dữ liệu Word
type Word = {
  en: string;
  vi: string;
};



export function Welcome() {
  const [wordList, setWordList] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // 🔹 Đọc dữ liệu từ file vocabulary.txt
  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch("./vocabulary.txt"); // 📂 File đặt trong thư mục public
        const text = await response.text();
        
        // ✨ Chuyển đổi nội dung file thành danh sách từ vựng
        const words: Word[] = text.split("\n").map((line) => {
          const [en, vi] = line.split("|");
          return { en: en.trim(), vi: vi.trim() };
        });

        setWordList(words);
      } catch (error) {
        console.error("Lỗi đọc file:", error);
      }
    };

    fetchWords();
  }, []);

  // 🔹 Bắt đầu quiz
  const startQuiz = () => {
    if (wordList.length === 0) return;

    const randomIndex = Math.floor(Math.random() * wordList.length);
    const newWord = wordList[randomIndex];
    setCurrentWord(newWord);

    // 🔸 Tạo danh sách 4 lựa chọn
    let choices = new Set<string>();
    choices.add(newWord.vi);

    while (choices.size < 4) {
      const randomChoice = wordList[Math.floor(Math.random() * wordList.length)].vi;
      choices.add(randomChoice);
    }

    setOptions([...choices].sort(() => Math.random() - 0.5));
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  // 🔹 Kiểm tra đáp án
  const checkAnswer = (answer: string) => {
    if (!currentWord) return;

    setSelectedAnswer(answer);
    setIsCorrect(answer === currentWord.vi);
  };

  return (
    
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Vocabulary Practice</h1>

      <button
        onClick={startQuiz}
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        Start Quiz
      </button>

      {currentWord && (
        <div className="bg-white p-4 rounded shadow-md w-80 text-center">
          <p className="text-xl font-bold">{currentWord.en}</p>

          {/* 🔹 Hiển thị 4 lựa chọn */}
          <div className="mt-4">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => checkAnswer(option)}
                className={`block w-full px-4 py-2 my-1 rounded ${
                  selectedAnswer === option
                    ? isCorrect
                      ? "bg-green-500 text-white"
                      : "bg-red-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>

    
    </main>
  );
}

const resources = [
  {
    href: "https://reactrouter.com/docs",
    text: "React Router Docs",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M9.99981 10.0751V9.99992M17.4688 17.4688C15.889 19.0485 11.2645 16.9853 7.13958 12.8604C3.01467 8.73546 0.951405 4.11091 2.53116 2.53116C4.11091 0.951405 8.73546 3.01467 12.8604 7.13958C16.9853 11.2645 19.0485 15.889 17.4688 17.4688ZM2.53132 17.4688C0.951566 15.8891 3.01483 11.2645 7.13974 7.13963C11.2647 3.01471 15.8892 0.951453 17.469 2.53121C19.0487 4.11096 16.9854 8.73551 12.8605 12.8604C8.73562 16.9853 4.11107 19.0486 2.53132 17.4688Z"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    href: "https://rmx.as/discord",
    text: "Join Discord",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="20"
        viewBox="0 0 24 20"
        fill="none"
        className="stroke-gray-600 group-hover:stroke-current dark:stroke-gray-300"
      >
        <path
          d="M15.0686 1.25995L14.5477 1.17423L14.2913 1.63578C14.1754 1.84439 14.0545 2.08275 13.9422 2.31963C12.6461 2.16488 11.3406 2.16505 10.0445 2.32014C9.92822 2.08178 9.80478 1.84975 9.67412 1.62413L9.41449 1.17584L8.90333 1.25995C7.33547 1.51794 5.80717 1.99419 4.37748 2.66939L4.19 2.75793L4.07461 2.93019C1.23864 7.16437 0.46302 11.3053 0.838165 15.3924L0.868838 15.7266L1.13844 15.9264C2.81818 17.1714 4.68053 18.1233 6.68582 18.719L7.18892 18.8684L7.50166 18.4469C7.96179 17.8268 8.36504 17.1824 8.709 16.4944L8.71099 16.4904C10.8645 17.0471 13.128 17.0485 15.2821 16.4947C15.6261 17.1826 16.0293 17.8269 16.4892 18.4469L16.805 18.8725L17.3116 18.717C19.3056 18.105 21.1876 17.1751 22.8559 15.9238L23.1224 15.724L23.1528 15.3923C23.5873 10.6524 22.3579 6.53306 19.8947 2.90714L19.7759 2.73227L19.5833 2.64518C18.1437 1.99439 16.6386 1.51826 15.0686 1.25995Z"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
];

export default Welcome;
