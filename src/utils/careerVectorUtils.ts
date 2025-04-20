
import { supabase } from '../integrations/supabase/client';

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

    const matches = careerVectors.map(career => ({
      career_path: career.title,
      similarity_score: calculateCosineSimilarity(userVector, career.vector)
    }))
    .sort((a, b) => b.similarity_score - a.similarity_score)
    .slice(0, 5);

    return matches;
  } catch (error) {
    console.error('Error getting career matches:', error);
    return [];
  }
};
