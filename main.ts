#! /usr/bin/env node

import { log } from "console";
import * as readline from "readline";

// Define the interface for a question
interface Question {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

// Define the interface for a quiz
interface Quiz {
    questions: Question[];
}

// Define a function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Define a function to run the quiz
function runQuiz(quiz: Quiz, quizNumber: number): void {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question(`Quiz ${quizNumber}: Press Enter to start the quiz...`, () => {
        let score = 0;

        // Shuffle questions to randomize order
        const shuffledQuestions = shuffleArray(quiz.questions);

        askQuestion(0);

        function askQuestion(index: number): void {
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
                    } else {
                        console.log(
                            "Incorrect! The correct answer is: " +
                            question.options[question.correctAnswerIndex]
                        );
                    }

                    askQuestion(index + 1);
                });
            } else {
                rl.close();
                const percentageScore = (score / shuffledQuestions.length) * 100;
                console.log(
                    `Quiz ${quizNumber} Complete. Your Score: ${score}/${shuffledQuestions.length} (${percentageScore}%)`
                );
            }
        }
    });
}

// Example quiz
const myQuiz: Quiz = {
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