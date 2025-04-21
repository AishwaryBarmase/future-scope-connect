
import { QuizQuestion } from '../types/quiz';

export const quizQuestions2: QuizQuestion[] = [
  // IQ Questions
  {
    id: "IQ01",
    category: "IQ",
    text: "Which number comes next in the sequence -1,4,9,25,?",
    options: [
      { id: "IQ01-1", text: "36" },
      { id: "IQ01-2", text: "49" },
      { id: "IQ01-3", text: "16" },
      { id: "IQ01-4", text: "81" }
    ]
  },
  {
    id: "IQ02",
    category: "IQ",
    text: "Complete the pattern: AA,AB,AC,AD?",
    options: [
      { id: "IQ02-1", text: "BA" },
      { id: "IQ02-2", text: "AE" },
      { id: "IQ02-3", text: "BB" },
      { id: "IQ02-4", text: "CA" }
    ]
  },
  {
    id: "IQ03",
    category: "IQ",
    text: "Which number should replace the question mark – 10,14,19,25?",
    options: [
      { id: "IQ03-1", text: "32" },
      { id: "IQ03-2", text: "30" },
      { id: "IQ03-3", text: "31" },
      { id: "IQ03-4", text: "34" }
    ]
  },
  {
    id: "IQ04",
    category: "IQ",
    text: "Which of the following is the odd one out – 3,5,7,9,11?",
    options: [
      { id: "IQ04-1", text: "3" },
      { id: "IQ04-2", text: "7" },
      { id: "IQ04-3", text: "9" },
      { id: "IQ04-4", text: "11" }
    ]
  },
  {
    id: "IQ05",
    category: "IQ",
    text: "In a certain code, 'APPLE' is written as 124516. How is 'GRAPE' written?",
    options: [
      { id: "IQ05-1", text: "716451" },
      { id: "IQ05-2", text: "715641" },
      { id: "IQ05-3", text: "651741" },
      { id: "IQ05-4", text: "715461" }
    ]
  },
  
  // Personality Assessment
  {
    id: "PE01",
    category: "Personality",
    text: "How do you prefer to spend your free time?",
    options: [
      { id: "PE01-1", text: "Reading" },
      { id: "PE01-2", text: "Socializing" },
      { id: "PE01-3", text: "Watching Movies" },
      { id: "PE01-4", text: "Playing Sports" }
    ]
  },
  {
    id: "PE02",
    category: "Personality",
    text: "When faced with a challenge, you tend to:",
    options: [
      { id: "PE02-1", text: "Analyze the situation carefully" },
      { id: "PE02-2", text: "Jump into action" },
      { id: "PE02-3", text: "Seek advice from others" },
      { id: "PE02-4", text: "Avoid the situation" }
    ]
  },
  
  // Numerical Ability
  {
    id: "NA01",
    category: "Numerical Ability",
    text: "A mobile phone originally costs ₹25,000 and is offered at a 20% discount during a sale. What is the sale price?",
    options: [
      { id: "NA01-1", text: "₹20,000" },
      { id: "NA01-2", text: "₹18,000" },
      { id: "NA01-3", text: "₹22,500" },
      { id: "NA01-4", text: "₹23,000" }
    ]
  },
  {
    id: "NA02",
    category: "Numerical Ability",
    text: "If a car's fuel efficiency is 15 km per liter, how much fuel is needed to travel 450 km?",
    options: [
      { id: "NA02-1", text: "25 liters" },
      { id: "NA02-2", text: "30 liters" },
      { id: "NA02-3", text: "35 liters" },
      { id: "NA02-4", text: "40 liters" }
    ]
  },
  {
    id: "NA03",
    category: "Numerical Ability",
    text: "What percentage of 80 is 20?",
    options: [
      { id: "NA03-1", text: "15%" },
      { id: "NA03-2", text: "20%" },
      { id: "NA03-3", text: "25%" },
      { id: "NA03-4", text: "30%" }
    ]
  },
  {
    id: "NA04",
    category: "Numerical Ability",
    text: "A factory produces 1,200 units of a product in 8 days. How many units will it produce in 15 days at the same rate?",
    options: [
      { id: "NA04-1", text: "2000 units" },
      { id: "NA04-2", text: "2250 units" },
      { id: "NA04-3", text: "2400 units" },
      { id: "NA04-4", text: "2600 units" }
    ]
  },
  {
    id: "NA05",
    category: "Numerical Ability",
    text: "Solve for x: 3x + 15 = 0",
    options: [
      { id: "NA05-1", text: "-5" },
      { id: "NA05-2", text: "5" },
      { id: "NA05-3", text: "3" },
      { id: "NA05-4", text: "-3" }
    ]
  },
  
  // Memory and Concentration
  {
    id: "MM01",
    category: "Memory",
    text: "Arrange these characters in the correct order: S, K, P, A, M, G, I",
    options: [
      { id: "MM01-1", text: "GIKMPAS" },
      { id: "MM01-2", text: "GIKAPMS" },
      { id: "MM01-3", text: "SKPAMGI" },
      { id: "MM01-4", text: "SKAPGMI" }
    ]
  },
  
  // Abstract Reasoning
  {
    id: "AR01",
    category: "Abstract Reasoning",
    text: "Which shape comes next in the sequence? 🔺, 🔷, 🔺, 🔷, 🔺, ?",
    options: [
      { id: "AR01-1", text: "🔷" },
      { id: "AR01-2", text: "🔺" },
      { id: "AR01-3", text: "⬛" },
      { id: "AR01-4", text: "⭕" }
    ]
  },
  {
    id: "AR02",
    category: "Abstract Reasoning",
    text: "A shape is rotated 90° clockwise in each step. After 4 steps, what direction is it facing?",
    options: [
      { id: "AR02-1", text: "Same as the start" },
      { id: "AR02-2", text: "Opposite direction" },
      { id: "AR02-3", text: "90° to the right" },
      { id: "AR02-4", text: "Upside down" }
    ]
  },
  {
    id: "AR03",
    category: "Abstract Reasoning",
    text: "Which of these doesn't belong? ⬜ ◼ 🔲 ⬛",
    options: [
      { id: "AR03-1", text: "⬜" },
      { id: "AR03-2", text: "◼" },
      { id: "AR03-3", text: "🔲" },
      { id: "AR03-4", text: "⬛" }
    ]
  },
  {
    id: "AR04",
    category: "Abstract Reasoning",
    text: "If ⭕ = 2, 🔺 = 3, and 🔷 = 4, what is the value of ⭕ + 🔺 + 🔷?",
    options: [
      { id: "AR04-1", text: "8" },
      { id: "AR04-2", text: "9" },
      { id: "AR04-3", text: "10" },
      { id: "AR04-4", text: "11" }
    ]
  },
  {
    id: "AR05",
    category: "Abstract Reasoning",
    text: "A pattern shows a square with 1 dot inside, then 2 dots, then 3 dots. What comes next?",
    options: [
      { id: "AR05-1", text: "A square with 4 dots" },
      { id: "AR05-2", text: "A triangle with 1 dot" },
      { id: "AR05-3", text: "A circle with 3 dots" },
      { id: "AR05-4", text: "A square with no dots" }
    ]
  },
  
  // Mechanical Reasoning
  {
    id: "MR01",
    category: "Mechanical Reasoning",
    text: "If Gear A turns clockwise, and it's connected to Gear B (which is directly touching it), in which direction does Gear B turn?",
    options: [
      { id: "MR01-1", text: "Clockwise" },
      { id: "MR01-2", text: "Counter-clockwise" },
      { id: "MR01-3", text: "Both" },
      { id: "MR01-4", text: "It doesn't turn" }
    ]
  },
  {
    id: "MR02",
    category: "Mechanical Reasoning",
    text: "Which of the following will make lifting a heavy object with a lever easier?",
    options: [
      { id: "MR02-1", text: "Placing the fulcrum closer to the object" },
      { id: "MR02-2", text: "Placing the fulcrum closer to you" },
      { id: "MR02-3", text: "Making the lever shorter" },
      { id: "MR02-4", text: "Adding more weight to the object" }
    ]
  },
  {
    id: "MR03",
    category: "Mechanical Reasoning",
    text: "Which of the following will make lifting a heavy object with a lever easier?",
    options: [
      { id: "MR03-1", text: "Placing the fulcrum closer to the object" },
      { id: "MR03-2", text: "Placing the fulcrum closer to you" },
      { id: "MR03-3", text: "Making the lever shorter" },
      { id: "MR03-4", text: "Adding more weight to the object" }
    ]
  },
  {
    id: "MR04",
    category: "Mechanical Reasoning",
    text: "Why is it easier to push a heavy object up a long, gradual ramp than a short, steep one?",
    options: [
      { id: "MR04-1", text: "Less friction" },
      { id: "MR04-2", text: "Less gravity" },
      { id: "MR04-3", text: "Less force is required" },
      { id: "MR04-4", text: "The weight of the object changes" }
    ]
  },
  {
    id: "MR05",
    category: "Mechanical Reasoning",
    text: "If you increase the area of a hydraulic piston while keeping the input force the same, what happens to the output force?",
    options: [
      { id: "MR05-1", text: "It decreases" },
      { id: "MR05-2", text: "It stays the same" },
      { id: "MR05-3", text: "It increases" },
      { id: "MR05-4", text: "It reverses direction" }
    ]
  },
  
  // Emotional Intelligence
  {
    id: "EQ01",
    category: "EQ",
    text: "You receive negative feedback on a project you worked hard on. What's the most emotionally intelligent first response?",
    options: [
      { id: "EQ01-1", text: "Get defensive and explain why they're wrong" },
      { id: "EQ01-2", text: "Ignore the feedback" },
      { id: "EQ01-3", text: "Listen calmly and ask questions to understand it better" },
      { id: "EQ01-4", text: "Blame the situation or someone else" }
    ]
  },
  {
    id: "EQ02",
    category: "EQ",
    text: "Your friend is upset after failing a test. What's the best way to respond?",
    options: [
      { id: "EQ02-1", text: "\"That's not a big deal, just move on.\"" },
      { id: "EQ02-2", text: "\"I failed once too, it's not the end of the world.\"" },
      { id: "EQ02-3", text: "\"I can see this really upset you — want to talk about it?\"" },
      { id: "EQ02-4", text: "\"You should've studied more.\"" }
    ]
  },
  {
    id: "EQ03",
    category: "EQ",
    text: "During a group project, one member isn't contributing. What should you do first?",
    options: [
      { id: "EQ03-1", text: "Report them to the teacher or leader" },
      { id: "EQ03-2", text: "Ignore it — they'll catch up" },
      { id: "EQ03-3", text: "Call them out in front of everyone" },
      { id: "EQ03-4", text: "Have a private conversation to understand what's going on" }
    ]
  },
  {
    id: "EQ04",
    category: "EQ",
    text: "You didn't get the internship you wanted. What's the best emotional response to build resilience?",
    options: [
      { id: "EQ04-1", text: "\"I'll never be good enough.\"" },
      { id: "EQ04-2", text: "\"There must be something wrong with me.\"" },
      { id: "EQ04-3", text: "\"This is disappointing, but I'll learn from it and try again.\"" },
      { id: "EQ04-4", text: "\"Whatever, I didn't care anyway.\"" }
    ]
  },
  {
    id: "EQ05",
    category: "EQ",
    text: "You're feeling very frustrated during a stressful exam. What's the best action to take?",
    options: [
      { id: "EQ05-1", text: "Leave the room" },
      { id: "EQ05-2", text: "Take a few deep breaths and refocus" },
      { id: "EQ05-3", text: "Think about how unfair the test is" },
      { id: "EQ05-4", text: "Talk to another student during the test" }
    ]
  }
];
