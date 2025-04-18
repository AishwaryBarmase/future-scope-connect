
interface RoadmapInfo {
  [key: string]: string;
}

export const careerRoadmaps: RoadmapInfo = {
  "Software Developer": "https://roadmap.sh/",
  "Data Scientist": "https://roadmap.sh/ai-data-scientist",
  "Machine Learning Engineer": "https://pclub.in/roadmap/2024/06/06/ml-roadmap/",
  "Cybersecurity Specialist": "https://roadmap.sh/cyber-security",
  "Cloud Computing Engineer": "https://roadmap.sh/aws",
  "Full Stack Developer": "https://roadmap.sh/full-stack",
  "Blockchain Developer": "https://roadmap.sh/blockchain",
  "Graphic Designer": "https://www.coursera.org/resources/job-leveling-matrix-for-graphic-design-career-pathways"
};

export const getRoadmapLink = (careerTitle: string): string | null => {
  return careerRoadmaps[careerTitle] || null;
};
