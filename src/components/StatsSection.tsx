
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const StatsItem = ({ label, value, suffix = "", prefix = "" }: { label: string, value: number, suffix?: string, prefix?: string }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const animationDuration = 2000; // ms
    const frameDuration = 1000 / 60; // ms
    const totalFrames = Math.round(animationDuration / frameDuration);
    const countIncrement = value / totalFrames;
    
    let currentFrame = 0;
    
    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      const currentCount = Math.round(easingFunction(progress) * value);
      
      if (currentFrame === totalFrames) {
        clearInterval(counter);
        setCount(value);
      } else {
        setCount(currentCount);
      }
    }, frameDuration);
    
    return () => clearInterval(counter);
  }, [value]);
  
  // Easing function for smoother animation
  const easingFunction = (t: number) => {
    return t < 0.5
      ? 4 * t * t * t
      : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  };
  
  return (
    <div className="text-center p-6 glass-card">
      <div className="text-3xl md:text-4xl font-bold mb-2">
        {prefix}{Math.round(count).toLocaleString()}{suffix}
      </div>
      <div className="text-gray-600">{label}</div>
    </div>
  );
};

const StatsSection = () => {
  const [stats, setStats] = useState({
    users: 0,
    activeUsers: 0,
    careerPaths: 0,
    testsCompleted: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total users count
        const { count: usersCount, error: usersError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });

        // Fetch active users (users active in the last 24 hours)
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        const { count: activeCount, error: activeError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true })
          .gt('last_sign_in_at', oneDayAgo.toISOString());

        // Fetch career paths count
        const { count: careerPathsCount, error: careerError } = await supabase
          .from('career_options')
          .select('*', { count: 'exact', head: true });

        // Fetch total tests completed count - using test_history table instead of quiz_results
        const { count: testsCount, error: testsError } = await supabase
          .from('test_history')
          .select('*', { count: 'exact', head: true });

        setStats({
          users: usersCount || 0,
          activeUsers: activeCount || 0,
          careerPaths: careerPathsCount || 0,
          testsCompleted: testsCount || 0
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        // Fallback to default stats if there's an error
        setStats({
          users: 500,
          activeUsers: 120,
          careerPaths: 250,
          testsCompleted: 1500
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Thousands</h2>
          <p className="text-lg text-gray-600">
            Join the growing community of professionals transforming their careers with FutureScope.AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatsItem label="Registered Users" value={stats.users} suffix="+" />
          <StatsItem label="Active Users" value={stats.activeUsers} suffix="+" />
          <StatsItem label="Career Paths" value={stats.careerPaths} suffix="+" />
          <StatsItem label="Tests Completed" value={stats.testsCompleted} suffix="+" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
