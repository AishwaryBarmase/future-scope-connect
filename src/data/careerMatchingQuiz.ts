
import { QuizQuestion } from '../types/quiz';

export const careerMatchingQuiz: QuizQuestion[] = [
  {
    id: 'Q1',
    category: 'Interests & Passions',
    text: 'Which of the following activities do you find most engaging and enjoyable in your free time?',
    options: [
      { id: 'Q1-a', text: 'Writing code, building software, or tinkering with hardware.' },
      { id: 'Q1-b', text: 'Creating visual designs, writing stories, or producing videos.' },
      { id: 'Q1-c', text: 'Analyzing data, organizing projects, or leading teams.' },
      { id: 'Q1-d', text: 'Learning about biology, medicine, or the environment.' },
      { id: 'Q1-e', text: 'Sharing knowledge, mentoring others, or developing learning materials.' },
      { id: 'Q1-f', text: 'Flying, negotiating deals, coaching sports, cooking, planning events, or helping people with their mental well-being.' }
    ]
  },
  {
    id: 'Q2',
    category: 'Interests & Passions',
    text: 'What kind of content do you most often seek out and consume?',
    options: [
      { id: 'Q2-a', text: 'Technology news, scientific journals, or coding tutorials.' },
      { id: 'Q2-b', text: 'Art portfolios, creative writing blogs, or film reviews.' },
      { id: 'Q2-c', text: 'Business news, market trends, or leadership podcasts.' },
      { id: 'Q2-d', text: 'Health and wellness articles, nature documentaries, or medical research.' },
      { id: 'Q2-e', text: 'Educational videos, academic discussions, or curriculum resources.' },
      { id: 'Q2-f', text: 'Aviation blogs, legal case studies, sports analyses, cooking shows, event planning guides, or psychology articles.' }
    ]
  },
  {
    id: 'Q3',
    category: 'Skills & Abilities',
    text: 'Which of the following are you most proficient at or enjoy developing?',
    options: [
      { id: 'Q3-a', text: 'Logical reasoning, problem-solving, and technical skills.' },
      { id: 'Q3-b', text: 'Creativity, communication, and artistic expression.' },
      { id: 'Q3-c', text: 'Analytical thinking, strategic planning, and interpersonal skills.' },
      { id: 'Q3-d', text: 'Scientific inquiry, attention to detail, and practical application of knowledge.' },
      { id: 'Q3-e', text: 'Explaining concepts clearly, facilitating learning, and organizing information.' },
      { id: 'Q3-f', text: 'Physical coordination, persuasive communication, culinary techniques, organizational skills, or empathetic listening.' }
    ]
  },
  {
    id: 'Q4',
    category: 'Skills & Abilities',
    text: 'Imagine you are working on a challenging project. What role would you naturally gravitate towards?',
    options: [
      { id: 'Q4-a', text: 'The person who figures out the technical implementation and makes it work.' },
      { id: 'Q4-b', text: 'The person who comes up with innovative ideas and presents them visually or verbally.' },
      { id: 'Q4-c', text: 'The person who plans the steps, manages the team, and ensures everyone is on track.' },
      { id: 'Q4-d', text: 'The person who conducts thorough research and ensures accuracy and quality.' },
      { id: 'Q4-e', text: 'The person who trains others and helps them understand the project goals and tasks.' },
      { id: 'Q4-f', text: 'The person who takes charge in a dynamic situation, negotiates solutions, or provides specialized expertise.' }
    ]
  },
  {
    id: 'Q5',
    category: 'Work Style & Values',
    text: 'What kind of work environment do you thrive in?',
    options: [
      { id: 'Q5-a', text: 'Fast-paced, intellectually stimulating, and focused on innovation.' },
      { id: 'Q5-b', text: 'Collaborative, creative, and allowing for self-expression.' },
      { id: 'Q5-c', text: 'Structured, goal-oriented, and involving leadership opportunities.' },
      { id: 'Q5-d', text: 'Detail-oriented, research-driven, and contributing to tangible outcomes.' },
      { id: 'Q5-e', text: 'Interactive, supportive, and focused on making a positive impact through education.' },
      { id: 'Q5-f', text: 'Dynamic, requiring adaptability, and offering unique experiences.' }
    ]
  },
  {
    id: 'Q6',
    category: 'Work Style & Values',
    text: 'What is most important to you in a career?',
    options: [
      { id: 'Q6-a', text: 'Intellectual challenge and the opportunity to build and create.' },
      { id: 'Q6-b', text: 'Making a creative contribution and sharing your vision with others.' },
      { id: 'Q6-c', text: 'Having influence, achieving results, and leading initiatives.' },
      { id: 'Q6-d', text: 'Contributing to the well-being of others or advancing scientific understanding.' },
      { id: 'Q6-e', text: 'Helping people learn and grow, and making a difference in education.' },
      { id: 'Q6-f', text: 'Excitement, variety, and the chance to apply unique skills.' }
    ]
  },
  {
    id: 'Q7',
    category: 'Education & Training',
    text: 'What subjects did you enjoy or excel in during your education?',
    options: [
      { id: 'Q7-a', text: 'Math, science, and computer science.' },
      { id: 'Q7-b', text: 'Art, literature, and media studies.' },
      { id: 'Q7-c', text: 'Business, economics, and social sciences.' },
      { id: 'Q7-d', text: 'Biology, chemistry, and environmental science.' },
      { id: 'Q7-e', text: 'History, languages, and education-related subjects.' },
      { id: 'Q7-f', text: 'Varies widely depending on the specific miscellaneous career.' }
    ]
  },
  {
    id: 'Q8',
    category: 'Education & Training',
    text: 'What level and type of education are you considering or have already attained?',
    options: [
      { id: 'Q8-a', text: 'Bachelor\'s or Master\'s degree in a technical field, coding bootcamps.' },
      { id: 'Q8-b', text: 'Bachelor\'s or Master\'s degree in design, writing, film, or related areas.' },
      { id: 'Q8-c', text: 'Bachelor\'s or Master\'s degree in business, finance, or management.' },
      { id: 'Q8-d', text: 'Bachelor\'s, Master\'s, or Doctoral degree in a science or health-related field.' },
      { id: 'Q8-e', text: 'Bachelor\'s, Master\'s, or Doctoral degree in education or a specific academic discipline.' },
      { id: 'Q8-f', text: 'Specific certifications, vocational training, or degrees relevant to the chosen field (e.g., flight school, law degree, culinary arts program).' }
    ]
  },
  {
    id: 'Q9',
    category: 'Problem Solving',
    text: 'When faced with a complex problem, what is your typical first approach?',
    options: [
      { id: 'Q9-a', text: 'To break it down into smaller, manageable steps and analyze the logic.' },
      { id: 'Q9-b', text: 'To brainstorm creative solutions and visualize different possibilities.' },
      { id: 'Q9-c', text: 'To research existing strategies and consult with others for their input.' },
      { id: 'Q9-d', text: 'To conduct experiments or gather data to understand the underlying mechanisms.' },
      { id: 'Q9-e', text: 'To explain the problem to someone else to clarify your own understanding.' },
      { id: 'Q9-f', text: 'To rely on established protocols or seek expert guidance specific to the situation.' }
    ]
  },
  {
    id: 'Q10',
    category: 'Feedback & Growth',
    text: 'How do you prefer to receive feedback on your work?',
    options: [
      { id: 'Q10-a', text: 'Detailed technical critiques and suggestions for improvement.' },
      { id: 'Q10-b', text: 'Encouragement and appreciation for your creative output.' },
      { id: 'Q10-c', text: 'Clear metrics and evaluations based on defined goals.' },
      { id: 'Q10-d', text: 'Constructive criticism focused on accuracy and scientific rigor.' },
      { id: 'Q10-e', text: 'Insights into how your work has impacted learning and understanding.' },
      { id: 'Q10-f', text: 'Specific evaluations related to performance standards in your field.' }
    ]
  },
  {
    id: 'Q11',
    category: 'Leadership',
    text: 'Imagine you have a leadership role in a team. What would be your primary focus?',
    options: [
      { id: 'Q11-a', text: 'Ensuring the technical aspects are sound and the project is well-engineered.' },
      { id: 'Q11-b', text: 'Fostering a collaborative and innovative environment where ideas can flourish.' },
      { id: 'Q11-c', text: 'Setting clear objectives, delegating tasks effectively, and monitoring progress.' },
      { id: 'Q11-d', text: 'Maintaining high standards of quality and accuracy in all deliverables.' },
      { id: 'Q11-e', text: 'Guiding and mentoring team members to develop their skills and knowledge.' },
      { id: 'Q11-f', text: 'Leading by example and applying specialized expertise to achieve the team\'s goals.' }
    ]
  },
  {
    id: 'Q12',
    category: 'Impact & Purpose',
    text: 'What type of impact do you hope your career will have?',
    options: [
      { id: 'Q12-a', text: 'To build innovative technologies and solve complex technical challenges.' },
      { id: 'Q12-b', text: 'To inspire and entertain others through creative expression.' },
      { id: 'Q12-c', text: 'To contribute to organizational success and drive strategic growth.' },
      { id: 'Q12-d', text: 'To improve health, well-being, or our understanding of the natural world.' },
      { id: 'Q12-e', text: 'To empower individuals through education and knowledge sharing.' },
      { id: 'Q12-f', text: 'To apply unique skills in a specialized field and achieve tangible results.' }
    ]
  },
  {
    id: 'Q13',
    category: 'Learning Style',
    text: 'Which of the following statements best describes your learning style?',
    options: [
      { id: 'Q13-a', text: 'I learn best by doing, experimenting, and figuring things out hands-on.' },
      { id: 'Q13-b', text: 'I learn best through visual aids, discussions, and creative exercises.' },
      { id: 'Q13-c', text: 'I learn best through structured information, logical frameworks, and practical application.' },
      { id: 'Q13-d', text: 'I learn best through research, analysis, and critical evaluation of information.' },
      { id: 'Q13-e', text: 'I learn best by teaching others and engaging in interactive learning environments.' },
      { id: 'Q13-f', text: 'My learning style varies depending on the specific subject matter and context.' }
    ]
  },
  {
    id: 'Q14',
    category: 'Risk & Innovation',
    text: 'How comfortable are you with taking risks and trying new things?',
    options: [
      { id: 'Q14-a', text: 'I am generally comfortable with calculated risks, especially in technical domains.' },
      { id: 'Q14-b', text: 'I enjoy exploring new ideas and pushing creative boundaries.' },
      { id: 'Q14-c', text: 'I prefer a more structured and predictable environment but am open to calculated risks for strategic gain.' },
      { id: 'Q14-d', text: 'I am cautious and prefer to rely on established methods and proven results.' },
      { id: 'Q14-e', text: 'I am comfortable with ambiguity and adapting my approach to different learning situations.' },
      { id: 'Q14-f', text: 'My comfort level with risk depends heavily on the specific field and potential consequences.' }
    ]
  },
  {
    id: 'Q15',
    category: 'Motivation',
    text: 'What motivates you most in your work?',
    options: [
      { id: 'Q15-a', text: 'The satisfaction of solving intricate problems and creating functional systems.' },
      { id: 'Q15-b', text: 'The opportunity to express my creativity and connect with others emotionally.' },
      { id: 'Q15-c', text: 'The drive to achieve goals, lead teams, and make a tangible impact on an organization.' },
      { id: 'Q15-d', text: 'The desire to contribute to meaningful advancements in science or healthcare.' },
      { id: 'Q15-e', text: 'The fulfillment of helping others learn and develop their potential.' },
      { id: 'Q15-f', text: 'The pursuit of excellence in a specialized skill and the achievement of mastery.' }
    ]
  }
];
