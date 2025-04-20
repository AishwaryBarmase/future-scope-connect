
import { supabase } from '../integrations/supabase/client';
import { CareerMatchResult } from '../types/quiz';

export const calculateCosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
  const dotProduct = vectorA.reduce((sum, a, i) => sum + a * vectorB[i], 0);
  const magnitudeA = Math.sqrt(vectorA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vectorB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
};

export const convertResponsesToVector = (responses: Record<string, string>): number[] => {
  const vector = new Array(90).fill(0); // 15 questions * 6 options
  Object.entries(responses).forEach(([questionId, answerId]) => {
    const questionIndex = parseInt(questionId.slice(1)) - 1;
    const optionIndex = answerId.charAt(answerId.length - 1).charCodeAt(0) - 97;
    vector[questionIndex * 6 + optionIndex] = 1;
  });
  return vector;
};

export const getCareerMatches = async (userVector: number[]): Promise<CareerMatchResult[]> => {
  try {
    const { data: careerVectors, error } = await supabase
      .from('career_options')
      .select('*');

    if (error) throw error;

    // Generate placeholder vectors for career options if they don't have vectors
    // This is a temporary solution until real vectors are available in the database
    const matches = careerVectors.map(career => {
      // Create a mock vector based on keywords and title for demonstration
      // In a real implementation, you would use actual vectors from the database
      const mockVector = new Array(90).fill(0);
      
      // Set some values in the mock vector based on career data
      // This is just a placeholder approach
      const hash = career.title.split('').reduce((acc, char) => {
        return acc + char.charCodeAt(0);
      }, 0);
      
      // Use the hash to seed some values in the vector
      for (let i = 0; i < 5; i++) {
        const index = (hash + i * 13) % 90;
        mockVector[index] = 1;
      }
      
      // Use keywords to influence the mock vector
      career.keywords.forEach((keyword, idx) => {
        const keywordHash = keyword.split('').reduce((acc, char) => {
          return acc + char.charCodeAt(0);
        }, 0);
        const index = (keywordHash + idx) % 90;
        mockVector[index] = 1;
      });

      return {
        career_path: career.title,
        similarity_score: calculateCosineSimilarity(userVector, mockVector)
      };
    })
    .sort((a, b) => b.similarity_score - a.similarity_score)
    .slice(0, 5);

    return matches;
  } catch (error) {
    console.error('Error getting career matches:', error);
    return [];
  }
};
