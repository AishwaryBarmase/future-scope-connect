
import { supabase } from '../integrations/supabase/client';
import { CareerMatchResult } from '../types/quiz';

// Improved cosine similarity calculation
export const calculateCosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * (vectorB[i] || 0), 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB) || 0; // Prevent NaN
};

// KNN algorithm for aptitude quiz
export const knnAlgorithm = (userScores: Record<string, number>, allCareers: any[], k: number = 5): any[] => {
  // Extract user profile as vector
  const userVector = Object.values(userScores);
  
  // Calculate distances to all careers
  const distances = allCareers.map(career => {
    // Convert career traits to a comparable vector
    // This assumes career.profile_traits has matching categories to userScores
    const careerVector = Object.values(career.profile_traits || {});
    
    // Calculate Euclidean distance
    let distanceSum = 0;
    for (let i = 0; i < userVector.length; i++) {
      const diff = (userVector[i] || 0) - (careerVector[i] || 0);
      distanceSum += diff * diff;
    }
    const distance = Math.sqrt(distanceSum);
    
    return {
      career: career,
      distance: distance
    };
  });
  
  // Sort by shortest distance
  distances.sort((a, b) => a.distance - b.distance);
  
  // Return k nearest careers with match percentage
  const maxDistance = Math.max(...distances.map(d => d.distance));
  return distances.slice(0, k).map(item => ({
    career_path: item.career.name,
    similarity_score: Math.round((1 - item.distance / maxDistance) * 100)
  }));
};

export const convertResponsesToVector = (responses: Record<string, string>): number[] => {
  // Check if we're dealing with the career matching quiz (starts with Q) or the aptitude quiz
  if (Object.keys(responses)[0]?.startsWith('Q')) {
    // Career matching quiz format
    const vector = new Array(90).fill(0); // 15 questions * 6 options
    
    Object.entries(responses).forEach(([questionId, answerId]) => {
      // Extract the question number (e.g., 'Q1' -> 1)
      const questionNumber = parseInt(questionId.slice(1)) - 1;
      
      // Extract the option letter (e.g., 'a', 'b', etc.)
      const optionLetter = answerId.slice(-1).toLowerCase();
      
      // Convert option letter to index (a=0, b=1, c=2, etc.)
      const optionIndex = optionLetter.charCodeAt(0) - 97; // 'a' is 97 in ASCII
      
      // Set the vector value - ensure valid index
      if (questionNumber >= 0 && questionNumber < 15 && optionIndex >= 0 && optionIndex < 6) {
        vector[questionNumber * 6 + optionIndex] = 1;
      }
    });
    
    return vector;
  } else {
    // Original aptitude quiz format
    const vector = new Array(90).fill(0); // 15 questions * 6 options
    Object.entries(responses).forEach(([questionId, answerId]) => {
      const questionIndex = parseInt(questionId.substring(2)) - 1;
      const optionIndex = parseInt(answerId.slice(-1)) - 1;
      
      // Ensure valid indices
      if (questionIndex >= 0 && questionIndex < 15 && optionIndex >= 0 && optionIndex < 6) {
        vector[questionIndex * 6 + optionIndex] = 1;
      }
    });
    return vector;
  }
};

export const getCareerMatches = async (userVector: number[]): Promise<CareerMatchResult[]> => {
  try {
    const { data: careerOptions, error } = await supabase
      .from('career_options')
      .select('*');

    if (error) throw error;

    if (!careerOptions || careerOptions.length === 0) {
      console.error('No career options found in database');
      return [];
    }

    // Create career vectors based on keywords and title
    const matches = careerOptions.map(career => {
      // Create a vector based on career data
      const careerVector = new Array(90).fill(0);
      
      // Set some values in the vector based on career data
      const keywordsHash = (career.keywords || []).reduce((acc, word, idx) => {
        return acc + (word.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) * (idx + 1));
      }, 0);
      
      const titleHash = career.title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      
      // Seed vector values based on hashes
      for (let i = 0; i < 15; i++) {
        const keywordIndex = (keywordsHash + i * 17) % 90;
        const titleIndex = (titleHash + i * 13) % 90;
        careerVector[keywordIndex] = 1;
        careerVector[titleIndex] = 1;
      }

      // Calculate similarity
      const similarity = calculateCosineSimilarity(userVector, careerVector);

      return {
        career_path: career.title,
        similarity_score: Math.round(similarity * 100)
      };
    });

    // Sort by highest similarity and take top 5
    return matches
      .sort((a, b) => b.similarity_score - a.similarity_score)
      .slice(0, 5);
  } catch (error) {
    console.error('Error getting career matches:', error);
    return [];
  }
};

// This function processes aptitude quiz results and suggests careers
export const processAptitudeResults = async (responses: Record<string, string>): Promise<CareerMatchResult[]> => {
  try {
    // Calculate scores by category
    const categoryScores: Record<string, number> = {};
    const categories = ['IQ', 'Personality', 'Numerical Ability', 'Memory', 'Career Interests', 'Mechanical Reasoning', 'Abstract Reasoning', 'EQ'];
    
    // Define correct answers for scoring
    const correctAnswers: Record<string, string> = {
      'IQ01': 'IQ01-2', // 49
      'IQ02': 'IQ02-2', // AE
      'IQ03': 'IQ03-1', // 32
      'IQ04': 'IQ04-3', // 9
      'IQ05': 'IQ05-2', // 715641
      'NA01': 'NA01-2', // 18,000
      'NA02': 'NA02-2', // 30 liters
      'NA03': 'NA03-3', // 25%
      'NA04': 'NA04-2', // 2250 units
      'NA05': 'NA05-1', // -5
      'MM01': 'MM01-3', // SKPAMGI
      'AR01': 'AR01-1', // 🔷
      'AR02': 'AR02-1', // Same as the start
      'AR03': 'AR03-3', // 🔲
      'AR04': 'AR04-2', // 9
      'AR05': 'AR05-1', // A square with 4 dots
      'MR01': 'MR01-2', // Counter-clockwise
      'MR02': 'MR02-2', // Placing the fulcrum closer to you
      'MR03': 'MR03-2', // Placing the fulcrum closer to you
      'MR04': 'MR04-3', // Less force is required
      'MR05': 'MR05-3', // It increases
      'EQ01': 'EQ01-3', // Listen calmly
      'EQ02': 'EQ02-3', // I can see this upset you
      'EQ03': 'EQ03-4', // Have a private conversation
      'EQ04': 'EQ04-3', // This is disappointing but I'll learn
      'EQ05': 'EQ05-2', // Take deep breaths
    };
    
    // Process responses by category
    categories.forEach(category => {
      // Get responses for this category
      const categoryResponses = Object.keys(responses).filter(key => 
        key.startsWith(category.substring(0, 2)));
      
      let score = 0;
      categoryResponses.forEach(questionId => {
        // Give points for correct answers
        if (correctAnswers[questionId] && responses[questionId] === correctAnswers[questionId]) {
          score += 20; // 20 points per correct answer
        }
      });
      
      // Calculate percentage score
      const maxScore = categoryResponses.length * 20;
      const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
      categoryScores[category] = Math.round(percentage);
    });
    
    // Fetch careers from database
    const { data: careers, error } = await supabase
      .from('careers')
      .select('*');
    
    if (error) throw error;
    
    if (!careers || careers.length === 0) {
      // If no careers in database, generate placeholder career suggestions
      return generatePlaceholderCareerSuggestions(categoryScores);
    }
    
    // Use KNN algorithm to find matching careers
    return knnAlgorithm(categoryScores, careers);
    
  } catch (error) {
    console.error('Error processing aptitude results:', error);
    return [];
  }
};

// Generate placeholder career suggestions if no careers in database
function generatePlaceholderCareerSuggestions(scores: Record<string, number>): CareerMatchResult[] {
  const mockCareers = [
    { name: "Software Developer", weights: { IQ: 0.3, "Numerical Ability": 0.3, "Abstract Reasoning": 0.2, "Career Interests": 0.2 } },
    { name: "Data Scientist", weights: { IQ: 0.25, "Numerical Ability": 0.4, "Abstract Reasoning": 0.25, EQ: 0.1 } },
    { name: "UX Designer", weights: { "Abstract Reasoning": 0.3, EQ: 0.3, Personality: 0.25, "Career Interests": 0.15 } },
    { name: "Project Manager", weights: { EQ: 0.4, Personality: 0.3, IQ: 0.15, "Abstract Reasoning": 0.15 } },
    { name: "Mechanical Engineer", weights: { "Mechanical Reasoning": 0.4, IQ: 0.2, "Numerical Ability": 0.3, "Abstract Reasoning": 0.1 } }
  ];
  
  // Calculate weighted scores for each career
  return mockCareers.map(career => {
    let matchScore = 0;
    Object.entries(career.weights).forEach(([category, weight]) => {
      matchScore += (scores[category] || 0) * weight;
    });
    
    return {
      career_path: career.name,
      similarity_score: Math.min(Math.round(matchScore), 100)
    };
  }).sort((a, b) => b.similarity_score - a.similarity_score);
}
