import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Award, LineChart as LineChartIcon } from "lucide-react";
import { ChartContainer, ChartTooltipContent, ChartLegend } from "@/components/ui/chart";

interface ScoresData {
  [category: string]: number;
}

const categoryColors: Record<string, string> = {
  'IQ': '#3b82f6', // blue-500
  'Personality': '#a855f7', // purple-500
  'Numerical Ability': '#22c55e', // green-500
  'Memory': '#f59e0b', // amber-500
  'Career Interests': '#ec4899', // pink-500
  'Mechanical Reasoning': '#f97316', // orange-500
  'Abstract Reasoning': '#6366f1', // indigo-500
  'EQ': '#f43f5e', // rose-500
};

const RADIAN = Math.PI / 180;

// Custom label for pie chart
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState<ScoresData>({});
  const [averageScores, setAverageScores] = useState<ScoresData>({});
  const [comparisonData, setComparisonData] = useState<any[]>([]);
  const [overallPerformance, setOverallPerformance] = useState<number>(0);
  const [careerSuggestions, setCareerSuggestions] = useState<any[]>([]);
  
  // Retrieve responses and quiz type from location state
  const responses = location.state?.responses || {};
  const quizType = location.state?.quizType || "aptitude";
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    const calculateScores = async () => {
      setLoading(true);
      
      try {
        // Store test in history
        if (user) {
          try {
            const { error } = await supabase
              .from('test_history')
              .insert({
                user_id: user.id,
                responses,
                test_type: quizType,
                score: {} // Will be populated later
              });
            
            if (error) console.error("Error saving test history:", error);
          } catch (err) {
            console.error("Error in test history save:", err);
          }
        }
        
        // Different calculation logic based on quiz type
        if (quizType === "career-matching") {
          // For career matching quiz, we directly use the matches from location state
          const matches = location.state?.careerMatches || [];
          setCareerSuggestions(matches);
          
          // Generate synthetic scores based on response patterns
          const syntheticScores: ScoresData = {
            'Technical': 0,
            'Creative': 0,
            'Leadership': 0,
            'Scientific': 0,
            'Educational': 0,
            'Specialized': 0
          };
          
          // Count preferences from responses
          Object.entries(responses).forEach(([qId, answer]) => {
            const optionLetter = (answer as string).slice(-1);
            switch(optionLetter) {
              case 'a': syntheticScores['Technical'] += 20; break;
              case 'b': syntheticScores['Creative'] += 20; break;
              case 'c': syntheticScores['Leadership'] += 20; break;
              case 'd': syntheticScores['Scientific'] += 20; break;
              case 'e': syntheticScores['Educational'] += 20; break;
              case 'f': syntheticScores['Specialized'] += 20; break;
            }
          });
          
          // Normalize scores to percentages
          Object.keys(syntheticScores).forEach(key => {
            syntheticScores[key] = Math.min(Math.round(syntheticScores[key] / 3), 100);
          });
          
          setScores(syntheticScores);
          
          // Mock average scores for comparison
          const mockAverageScores: ScoresData = {
            'Technical': 65,
            'Creative': 70,
            'Leadership': 60,
            'Scientific': 55,
            'Educational': 75,
            'Specialized': 58
          };
          
          setAverageScores(mockAverageScores);
          
          // Prepare comparison data for charts
          const compData = Object.keys(syntheticScores).map(category => ({
            name: category,
            userScore: syntheticScores[category],
            averageScore: mockAverageScores[category],
            fullMark: 100
          }));
          
          setComparisonData(compData);
          
          // Calculate overall performance
          const userTotal = Object.values(syntheticScores).reduce((sum, score) => sum + score, 0);
          const userAvg = userTotal / Object.values(syntheticScores).length;
          setOverallPerformance(Math.round(userAvg));
          
        } else {
          // Original aptitude quiz calculation
          // Calculate user's scores by category
          const userScores: ScoresData = {};
          const categories = ['IQ', 'Personality', 'Numerical Ability', 'Memory', 'Career Interests', 'Mechanical Reasoning', 'Abstract Reasoning', 'EQ'];
          
          // Process user responses
          categories.forEach(category => {
            // Get responses for this category
            const categoryResponses = Object.keys(responses).filter(key => key.startsWith(category.substring(0, 2)));
            
            // Calculate score based on responses (simplified scoring for demonstration)
            // In a real app, you'd have a more sophisticated scoring algorithm
            let score = 0;
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
            
            categoryResponses.forEach(questionId => {
              // Give points for correct answers (for objective questions)
              if (correctAnswers[questionId] && responses[questionId] === correctAnswers[questionId]) {
                score += 20; // 20 points per correct answer
              }
            });
            
            // Calculate percentage score
            const maxScore = categoryResponses.length * 20;
            const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
            
            userScores[category] = Math.round(percentage);
          });
          
          setScores(userScores);
          
          // Fetch average scores from other users
          // In a real app, this would be a database query to get aggregate data
          const mockAverageScores: ScoresData = {
            'IQ': 65,
            'Personality': 70,
            'Numerical Ability': 60,
            'Memory': 55,
            'Career Interests': 75,
            'Mechanical Reasoning': 58,
            'Abstract Reasoning': 62,
            'EQ': 68
          };
          
          setAverageScores(mockAverageScores);
          
          // Prepare comparison data for charts
          const compData = Object.keys(userScores).map(category => ({
            name: category,
            userScore: userScores[category],
            averageScore: mockAverageScores[category],
            fullMark: 100
          }));
          
          setComparisonData(compData);
          
          // Calculate overall performance
          const userTotal = Object.values(userScores).reduce((sum, score) => sum + score, 0);
          const userAvg = userTotal / Object.values(userScores).length;
          setOverallPerformance(Math.round(userAvg));
          
          // Generate career suggestions based on scores
          // In a real app, this would use a more sophisticated algorithm
          const mockCareers = [
            { name: "Software Developer", match: userScores['IQ'] * 0.3 + userScores['Numerical Ability'] * 0.3 + userScores['Abstract Reasoning'] * 0.2 + userScores['Career Interests'] * 0.2 },
            { name: "Data Scientist", match: userScores['IQ'] * 0.25 + userScores['Numerical Ability'] * 0.4 + userScores['Abstract Reasoning'] * 0.25 + userScores['EQ'] * 0.1 },
            { name: "UX Designer", match: userScores['Abstract Reasoning'] * 0.3 + userScores['EQ'] * 0.3 + userScores['Personality'] * 0.25 + userScores['Career Interests'] * 0.15 },
            { name: "Project Manager", match: userScores['EQ'] * 0.4 + userScores['Personality'] * 0.3 + userScores['IQ'] * 0.15 + userScores['Abstract Reasoning'] * 0.15 },
            { name: "Mechanical Engineer", match: userScores['Mechanical Reasoning'] * 0.4 + userScores['IQ'] * 0.2 + userScores['Numerical Ability'] * 0.3 + userScores['Abstract Reasoning'] * 0.1 }
          ];
          
          // Sort and format career suggestions
          const sortedCareers = mockCareers
            .map(career => ({ 
              ...career, 
              match: Math.min(Math.round(career.match / 100), 100) 
            }))
            .sort((a, b) => b.match - a.match)
            .slice(0, 5);
          
          setCareerSuggestions(sortedCareers);
        }
        
      } catch (error) {
        console.error("Error calculating results:", error);
      } finally {
        setLoading(false);
      }
    };
    
    calculateScores();
  }, [user, navigate, responses, quizType]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg">Analyzing your results...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Header Section */}
            <div className="mb-10 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {quizType === "career-matching" ? "Career Matching Results" : "Aptitude Assessment Results"}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We've analyzed your responses and compiled a comprehensive assessment of your skills, 
                aptitudes, and potential career matches.
              </p>
            </div>
            
            {/* Personal Info Card */}
            <div className="mb-8">
              <Card className="border-t-4 border-t-primary">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2 h-5 w-5 text-primary" />
                    Assessment Profile
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-500">Name</h3>
                      <p className="text-lg">{profile?.full_name || 'Anonymous User'}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500">Assessment Date</h3>
                      <p className="text-lg">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500">Overall Performance</h3>
                      <p className="text-lg font-semibold text-primary">{overallPerformance}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Results Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="careers">Career Matches</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="mr-2 h-5 w-5 text-primary" />
                      Skills Assessment
                    </CardTitle>
                    <CardDescription>
                      Your performance across different skill categories
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="userScore" name="Your Score" isAnimationActive={true}>
                            {comparisonData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Overall Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <div className="w-48 h-48 relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Score', value: overallPerformance },
                                { name: 'Remaining', value: 100 - overallPerformance }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              innerRadius={40}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={renderCustomizedLabel}
                            >
                              <Cell fill="#3b82f6" />
                              <Cell fill="#e5e7eb" />
                            </Pie>
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                          <p className="text-3xl font-bold text-primary">{overallPerformance}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Skills Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {Object.entries(scores).map(([category, score]) => (
                          <li key={category} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{category}</span>
                            <div className="flex items-center">
                              <div className="w-36 bg-gray-200 rounded-full h-2 mr-2">
                                <div 
                                  className="h-2 rounded-full" 
                                  style={{ width: `${score}%`, backgroundColor: categoryColors[category] }}
                                ></div>
                              </div>
                              <span className="text-sm font-semibold">{score}%</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Comparison Tab */}
              <TabsContent value="comparison" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChartIcon className="mr-2 h-5 w-5 text-primary" />
                      Performance Comparison
                    </CardTitle>
                    <CardDescription>
                      How your results compare to the average of other participants
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={comparisonData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 100]} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="userScore" name="Your Score">
                            {comparisonData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={categoryColors[entry.name]} />
                            ))}
                          </Bar>
                          <Bar dataKey="averageScore" name="Average Score" fill="#94a3b8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Radar Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart outerRadius={90} data={comparisonData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="name" />
                            <PolarRadiusAxis domain={[0, 100]} />
                            <Radar name="Your Score" dataKey="userScore" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                            <Radar name="Average Score" dataKey="averageScore" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.6} />
                            <Legend />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance vs Average</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: 'Above Average', value: Object.entries(scores).filter(([cat, score]) => score > (averageScores[cat] || 0)).length },
                                { name: 'Below Average', value: Object.entries(scores).filter(([cat, score]) => score <= (averageScores[cat] || 0)).length }
                              ]}
                              cx="50%"
                              cy="50%"
                              labelLine={true}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              <Cell fill="#22c55e" />
                              <Cell fill="#ef4444" />
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Career Matches Tab */}
              <TabsContent value="careers" className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Career Matches</CardTitle>
                    <CardDescription>
                      Based on your skills and aptitudes, these careers might be a good fit for you
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {careerSuggestions.map((career, index) => (
                        <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold text-lg">{career.name}</h3>
                            <span className="text-sm font-medium bg-primary/10 text-primary py-1 px-2 rounded-full">
                              {career.match}% Match
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${career.match}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
            
            {/* Action Buttons */}
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button onClick={() => navigate('/')} variant="outline">
                Return to Home
              </Button>
              <Button onClick={() => navigate('/profile/edit')}>
                Update My Profile
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Results;
