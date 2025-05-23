
import { QuizQuestion } from '../types/quiz';

export const quizQuestions: QuizQuestion[] = [
  // --- IQ ---
  {
    id: 'IQ01', 
    category: 'IQ', 
    text: 'Which number comes next in the sequence -1, 4, 9, 25, ?',
    options: [
      { id: 'IQ01-1', text: '36' },
      { id: 'IQ01-2', text: '49' },
      { id: 'IQ01-3', text: '16' },
      { id: 'IQ01-4', text: '81' }
    ]
  },
  {
    id: 'IQ02', 
    category: 'IQ', 
    text: 'Complete the pattern: AA, AB, AC, AD?',
    options: [
      { id: 'IQ02-1', text: 'BA' },
      { id: 'IQ02-2', text: 'AE' },
      { id: 'IQ02-3', text: 'BB' },
      { id: 'IQ02-4', text: 'CA' }
    ]
  },
  {
    id: 'IQ03', 
    category: 'IQ', 
    text: 'Which number should replace the question mark – 10, 14, 19, 25?',
    options: [
      { id: 'IQ03-1', text: '32' },
      { id: 'IQ03-2', text: '30' },
      { id: 'IQ03-3', text: '31' },
      { id: 'IQ03-4', text: '34' }
    ]
  },
  {
    id: 'IQ04', 
    category: 'IQ', 
    text: 'Which of the following is the odd one out – 3, 5, 7, 9, 11?',
    options: [
      { id: 'IQ04-1', text: '3' },
      { id: 'IQ04-2', text: '7' },
      { id: 'IQ04-3', text: '9' },
      { id: 'IQ04-4', text: '11' }
    ]
  },
  {
    id: 'IQ05', 
    category: 'IQ', 
    text: 'In a certain code, \'APPLE\' is written as 124516. How is \'GRAPE\' written?',
    options: [
      { id: 'IQ05-1', text: '716451' },
      { id: 'IQ05-2', text: '715641' },
      { id: 'IQ05-3', text: '651741' },
      { id: 'IQ05-4', text: '715461' }
    ]
  },
  
  // --- Personality ---
  {
    id: 'PA01', 
    category: 'Personality', 
    text: 'How do you prefer to spend your free time?',
    options: [
      { id: 'PA01-1', text: 'Reading' },
      { id: 'PA01-2', text: 'Socializing' },
      { id: 'PA01-3', text: 'Watching Movies' },
      { id: 'PA01-4', text: 'Playing Sports' }
    ]
  },
  {
    id: 'PA02', 
    category: 'Personality', 
    text: 'When faced with a challenge, you tend to:',
    options: [
      { id: 'PA02-1', text: 'Analyze the situation carefully' },
      { id: 'PA02-2', text: 'Jump into action' },
      { id: 'PA02-3', text: 'Seek advice from others' },
      { id: 'PA02-4', text: 'Avoid the situation' }
    ]
  },
  {
    id: 'PA03', 
    category: 'Personality', 
    text: 'What motivates you most?',
    options: [
      { id: 'PA03-1', text: 'Personal achievement' },
      { id: 'PA03-2', text: 'Recognition from others' },
      { id: 'PA03-3', text: 'Financial rewards' },
      { id: 'PA03-4', text: 'Helping others' }
    ]
  },
  {
    id: 'PA04', 
    category: 'Personality', 
    text: 'How do you handle criticism?',
    options: [
      { id: 'PA04-1', text: 'Reflect on it constructively' },
      { id: 'PA04-2', text: 'Take it personally' },
      { id: 'PA04-3', text: 'Dismiss it' },
      { id: 'PA04-4', text: 'Become defensive' }
    ]
  },
  {
    id: 'PA05', 
    category: 'Personality', 
    text: 'What role do you usually take in social situation?',
    options: [
      { id: 'PA05-1', text: 'The listener' },
      { id: 'PA05-2', text: 'The speaker' },
      { id: 'PA05-3', text: 'The organizer' },
      { id: 'PA05-4', text: 'The entertainer' }
    ]
  },
  
  // --- Numerical Ability ---
  {
    id: 'NA01', 
    category: 'Numerical Ability', 
    text: 'A mobile phone originally costs ₹25,000 and is offered at a 20% discount during a sale. What is the sale price?',
    options: [
      { id: 'NA01-1', text: 'Rs20,000' },
      { id: 'NA01-2', text: 'Rs18,000' },
      { id: 'NA01-3', text: 'Rs22,500' },
      { id: 'NA01-4', text: 'Rs23,000' }
    ]
  },
  {
    id: 'NA02', 
    category: 'Numerical Ability', 
    text: 'If a car\'s fuel efficiency is 15 km per liter, how much fuel is needed to travel 450 km?',
    options: [
      { id: 'NA02-1', text: '25 liters' },
      { id: 'NA02-2', text: '30 liters' },
      { id: 'NA02-3', text: '35 liters' },
      { id: 'NA02-4', text: '40 liters' }
    ]
  },
  {
    id: 'NA03', 
    category: 'Numerical Ability', 
    text: 'What is the percentage increase from 20 to 25?',
    options: [
      { id: 'NA03-1', text: '15%' },
      { id: 'NA03-2', text: '20%' },
      { id: 'NA03-3', text: '25%' },
      { id: 'NA03-4', text: '30%' }
    ]
  },
  {
    id: 'NA04', 
    category: 'Numerical Ability', 
    text: 'Factory: 1200 units/8 days. Units in 15 days?',
    options: [
      { id: 'NA04-1', text: '2000 units' },
      { id: 'NA04-2', text: '2250 units' },
      { id: 'NA04-3', text: '2400 units' },
      { id: 'NA04-4', text: '2600 units' }
    ]
  },
  {
    id: 'NA05', 
    category: 'Numerical Ability', 
    text: 'Solve for x: 3x + 15 = 0',
    options: [
      { id: 'NA05-1', text: '-5' },
      { id: 'NA05-2', text: '5' },
      { id: 'NA05-3', text: '3' },
      { id: 'NA05-4', text: '-3' }
    ]
  },
  
  // --- Memory ---
  {
    id: 'MM01', 
    category: 'Memory', 
    text: 'Arrange the following characters: G, I, M, K, A, P, S (First character is S)',
    options: [
      { id: 'MM01-1', text: 'SPKAMGI' },
      { id: 'MM01-2', text: 'SPKAIMG' },
      { id: 'MM01-3', text: 'SKPAMGI' },
      { id: 'MM01-4', text: 'SKPAGMI' }
    ]
  },
  
  // --- Career Interests ---
  {
    id: 'CI01', 
    category: 'Career Interests', 
    text: 'How interested are you in studying mathematics?',
    options: [
      { id: 'CI01-1', text: 'I love it; I solve math problems for fun' },
      { id: 'CI01-2', text: 'I enjoy it and find it stimulating' },
      { id: 'CI01-3', text: 'I am neutral; I don\'t mind it' },
      { id: 'CI01-4', text: 'I find it challenging but manageable' }
    ]
  },
  {
    id: 'CI02', 
    category: 'Career Interests', 
    text: 'How do you feel about Science subjects (Physics, Chemistry, Biology)?',
    options: [
      { id: 'CI02-1', text: 'I\'m passionate about science; I love learning how things work.' },
      { id: 'CI02-2', text: 'I like it and enjoy experimenting and learning' },
      { id: 'CI02-3', text: 'It\'s fine; I understand the basics.' },
      { id: 'CI02-4', text: 'I find it hard, but I get through it.' }
    ]
  },
  {
    id: 'CI03', 
    category: 'Career Interests', 
    text: 'How do you feel about learning foreign languages?',
    options: [
      { id: 'CI03-1', text: 'I love learning new languages and am excited by it.' },
      { id: 'CI03-2', text: 'I\'m neutral; I learn what\'s required.' },
      { id: 'CI03-3', text: 'I struggle with it, but I try.' },
      { id: 'CI03-4', text: 'I have no interest in learning another language.' }
    ]
  },
  {
    id: 'CI04', 
    category: 'Career Interests', 
    text: 'How interested are you in Computer Science and programming?',
    options: [
      { id: 'CI04-1', text: 'I love coding and want to pursue a career in tech.' },
      { id: 'CI04-2', text: 'I enjoy it and want to learn more.' },
      { id: 'CI04-3', text: 'I\'m neutral, but I see its value.' },
      { id: 'CI04-4', text: 'I find it difficult but manageable.' }
    ]
  },
  {
    id: 'CI05', 
    category: 'Career Interests', 
    text: 'How much do you enjoy Art and Creative subjects?',
    options: [
      { id: 'CI05-1', text: 'I\'m passionate about art and enjoy expressing myself creatively.' },
      { id: 'CI05-2', text: 'I like it and enjoy making art or learning about it.' },
      { id: 'CI05-3', text: 'It\'s fine, but I\'m not deeply invested in it.' },
      { id: 'CI05-4', text: 'I don\'t care much for it, but I can do the basics.' }
    ]
  },
  
  // --- Mechanical Reasoning ---
  {
    id: 'MR01', 
    category: 'Mechanical Reasoning', 
    text: 'If Gear A turns clockwise, and it\'s connected to Gear B (which is directly touching it), in which direction does Gear B turn?',
    options: [
      { id: 'MR01-1', text: 'Clockwise' },
      { id: 'MR01-2', text: 'Counter-clockwise' },
      { id: 'MR01-3', text: 'Both' },
      { id: 'MR01-4', text: 'It doesn\'t turn' }
    ]
  },
  {
    id: 'MR02', 
    category: 'Mechanical Reasoning', 
    text: 'Which of the following will make lifting a heavy object with a lever easier?',
    options: [
      { id: 'MR02-1', text: 'Placing the fulcrum closer to the object' },
      { id: 'MR02-2', text: 'Placing the fulcrum closer to you' },
      { id: 'MR02-3', text: 'Making the lever shorter' },
      { id: 'MR02-4', text: 'Adding more weight to the object' }
    ]
  },
  {
    id: 'MR03', 
    category: 'Mechanical Reasoning', 
    text: 'Which of the following will make lifting a heavy object with a lever easier?',
    options: [
      { id: 'MR03-1', text: 'Placing the fulcrum closer to the object' },
      { id: 'MR03-2', text: 'Placing the fulcrum closer to you' },
      { id: 'MR03-3', text: 'Making the lever shorter' },
      { id: 'MR03-4', text: 'Adding more weight to the object' }
    ]
  },
  {
    id: 'MR04', 
    category: 'Mechanical Reasoning', 
    text: 'Why is it easier to push a heavy object up a long, gradual ramp than a short, steep one?',
    options: [
      { id: 'MR04-1', text: 'Less friction' },
      { id: 'MR04-2', text: 'Less gravity' },
      { id: 'MR04-3', text: 'Less force is required' },
      { id: 'MR04-4', text: 'The weight of the object changes' }
    ]
  },
  {
    id: 'MR05', 
    category: 'Mechanical Reasoning', 
    text: 'If you increase the area of a hydraulic piston while keeping the input force the same, what happens to the output force?',
    options: [
      { id: 'MR05-1', text: 'It decreases' },
      { id: 'MR05-2', text: 'It stays the same' },
      { id: 'MR05-3', text: 'It increases' },
      { id: 'MR05-4', text: 'It reverses direction' }
    ]
  },
  
  // --- Abstract Reasoning ---
  {
    id: 'AR01', 
    category: 'Abstract Reasoning', 
    text: 'Which shape comes next in the sequence: 🔺, 🔷, 🔺, 🔷, 🔺, ?',
    options: [
      { id: 'AR01-1', text: '🔷' },
      { id: 'AR01-2', text: '🔺' },
      { id: 'AR01-3', text: '⬛' },
      { id: 'AR01-4', text: '⭕' }
    ]
  },
  {
    id: 'AR02', 
    category: 'Abstract Reasoning', 
    text: 'A shape is rotated 90° clockwise in each step. After 4 steps, what direction is it facing?',
    options: [
      { id: 'AR02-1', text: 'Same as the start' },
      { id: 'AR02-2', text: 'Opposite direction' },
      { id: 'AR02-3', text: '90° to the right' },
      { id: 'AR02-4', text: 'Upside down' }
    ]
  },
  {
    id: 'AR03', 
    category: 'Abstract Reasoning', 
    text: 'Which of these doesn\'t belong? ⬜ ◼ 🔲 ⬛',
    options: [
      { id: 'AR03-1', text: '⬜' },
      { id: 'AR03-2', text: '◼' },
      { id: 'AR03-3', text: '🔲' },
      { id: 'AR03-4', text: '⬛' }
    ]
  },
  {
    id: 'AR04', 
    category: 'Abstract Reasoning', 
    text: 'If ⭕ = 2, 🔺 = 3, and 🔷 = 4, what is the value of ⭕ + 🔺 + 🔷?',
    options: [
      { id: 'AR04-1', text: '8' },
      { id: 'AR04-2', text: '9' },
      { id: 'AR04-3', text: '10' },
      { id: 'AR04-4', text: '11' }
    ]
  },
  {
    id: 'AR05', 
    category: 'Abstract Reasoning', 
    text: 'A pattern shows a square with 1 dot inside, then 2 dots, then 3 dots. What comes next?',
    options: [
      { id: 'AR05-1', text: 'A square with 4 dots' },
      { id: 'AR05-2', text: 'A triangle with 1 dot' },
      { id: 'AR05-3', text: 'A circle with 3 dots' },
      { id: 'AR05-4', text: 'A square with no dots' }
    ]
  },
  
  // --- EQ (Emotional Quotient) ---
  {
    id: 'EQ01', 
    category: 'EQ', 
    text: 'You receive negative feedback on a project you worked hard on. What\'s the most emotionally intelligent first response?',
    options: [
      { id: 'EQ01-1', text: 'Get defensive and explain why they\'re wrong' },
      { id: 'EQ01-2', text: 'Ignore the feedback' },
      { id: 'EQ01-3', text: 'Listen calmly and ask questions to understand it better' },
      { id: 'EQ01-4', text: 'Blame the situation or someone else' }
    ]
  },
  {
    id: 'EQ02', 
    category: 'EQ', 
    text: 'Your friend is upset after failing a test. What\'s the best way to respond?',
    options: [
      { id: 'EQ02-1', text: 'That\'s not a big deal, just move on.' },
      { id: 'EQ02-2', text: 'I failed once too, it\'s not the end of the world.' },
      { id: 'EQ02-3', text: 'I can see this really upset you — want to talk about it?' },
      { id: 'EQ02-4', text: 'You should\'ve studied more.' }
    ]
  },
  {
    id: 'EQ03', 
    category: 'EQ', 
    text: 'During a group project, one member isn\'t contributing. What should you do first?',
    options: [
      { id: 'EQ03-1', text: 'Report them to the teacher or leader' },
      { id: 'EQ03-2', text: 'Ignore it — they\'ll catch up' },
      { id: 'EQ03-3', text: 'Call them out in front of everyone' },
      { id: 'EQ03-4', text: 'Have a private conversation to understand what\'s going on' }
    ]
  },
  {
    id: 'EQ04', 
    category: 'EQ', 
    text: 'You didn\'t get the internship you wanted. What\'s the best emotional response to build resilience?',
    options: [
      { id: 'EQ04-1', text: 'I\'ll never be good enough.' },
      { id: 'EQ04-2', text: 'There must be something wrong with me.' },
      { id: 'EQ04-3', text: 'This is disappointing, but I\'ll learn from it and try again.' },
      { id: 'EQ04-4', text: 'Whatever, I didn\'t care anyway.' }
    ]
  },
  {
    id: 'EQ05', 
    category: 'EQ', 
    text: 'You\'re feeling very frustrated during a stressful exam. What\'s the best action to take?',
    options: [
      { id: 'EQ05-1', text: 'Leave the room' },
      { id: 'EQ05-2', text: 'Take a few deep breaths and refocus' },
      { id: 'EQ05-3', text: 'Think about how unfair the test is' },
      { id: 'EQ05-4', text: 'Talk to another student during the test' }
    ]
  }
];
