
import { QuizQuestion } from '../types/quiz';

export const quizQuestions2: QuizQuestion[] = [
  {
    id: "Q1",
    category: "Interests & Passions",
    text: "Which of the following activities do you find most engaging and enjoyable in your free time?",
    options: [
      { id: "Q1a", text: "Writing code, building software, or tinkering with hardware." },
      { id: "Q1b", text: "Creating visual designs, writing stories, or producing videos." },
      { id: "Q1c", text: "Analyzing data, organizing projects, or leading teams." },
      { id: "Q1d", text: "Learning about biology, medicine, or the environment." },
      { id: "Q1e", text: "Sharing knowledge, mentoring others, or developing learning materials." },
      { id: "Q1f", text: "Flying, negotiating deals, coaching sports, cooking, planning events, or helping people with their mental well-being." }
    ]
  },
  // ... Add all other questions following the same pattern
];
