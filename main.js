"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
// Define a function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
// Define a function to run the quiz
function runQuiz(quiz, quizNumber) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question(`Quiz ${quizNumber}: Press Enter to start the quiz...`, () => {
        let score = 0;
        // Shuffle questions to randomize order
        const shuffledQuestions = shuffleArray(quiz.questions);
        askQuestion(0);
        function askQuestion(index) {
            if (index < shuffledQuestions.length) {
                const question = shuffledQuestions[index];
                console.log(`Question ${index + 1}: ${question.question}`);
                for (let j = 0; j < question.options.length; j++) {
                    console.log(`${j + 1}. ${question.options[j]}`);
                }
                rl.question("Enter your answer (1, 2, 3, etc.): ", (userAnswer) => {
                    const userAnswerIndex = parseInt(userAnswer) - 1;
                    if (userAnswerIndex === question.correctAnswerIndex) {
                        console.log("Correct!");
                        score++;
                    }
                    else {
                        console.log("Incorrect! The correct answer is: " +
                            question.options[question.correctAnswerIndex]);
                    }
                    askQuestion(index + 1);
                });
            }
            else {
                rl.close();
                const percentageScore = (score / shuffledQuestions.length) * 100;
                console.log(`Quiz ${quizNumber} Complete. Your Score: ${score}/${shuffledQuestions.length} (${percentageScore}%)`);
            }
        }
    });
}
// Example quiz
const myQuiz = {
    questions: [
        {
            question: "Is TypeScript case sensitive?",
            options: ["no", "sometimes", "yes"],
            correctAnswerIndex: 2,
        },
        {
            question: "What is the output of console.log(2 + 2)?",
            options: ["3", "4", "error"],
            correctAnswerIndex: 1,
        },
        {
            question: "What happens when you log an undefined variable?",
            options: ["ReferenceError", "babar", "Yes"],
            correctAnswerIndex: 0,
        },
    ],
};
runQuiz(myQuiz, 1);
