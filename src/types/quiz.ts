
export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  category: string;
  text: string;
  options: QuizOption[];
}

export interface CareerMatchResult {
  career_path: string;
  similarity_score: number;
}
