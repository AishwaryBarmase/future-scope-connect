
import { useState, useEffect } from "react";

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
          <StatsItem label="Active Users" value={10000} suffix="+" />
          <StatsItem label="Career Paths" value={250} suffix="+" />
          <StatsItem label="Career Transitions" value={4500} suffix="+" />
          <StatsItem label="Satisfaction Rate" value={96} suffix="%" />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
