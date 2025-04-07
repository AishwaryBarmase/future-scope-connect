
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Developer",
    avatar: "SJ",
    content: "FutureScope.AI helped me transition from marketing to software development. The personalized learning path and skill gap analysis were incredibly valuable in my career change.",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Data Analyst",
    avatar: "MC",
    content: "I was unsure about my career direction after college. The AI career matching tool gave me insights into careers that aligned with my skills and interests that I hadn't considered before.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "UX Designer",
    avatar: "PP",
    content: "The resume assistant and interview preparation tools helped me land my dream job. I'm now working at a company I love thanks to FutureScope.AI!",
    rating: 5
  },
  {
    name: "James Wilson",
    role: "Marketing Manager",
    avatar: "JW",
    content: "The skill certifications gave me an edge in a competitive job market. The AI career coach provided valuable feedback that improved my interviewing skills.",
    rating: 4
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <Card className="h-full">
    <CardContent className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${testimonial.avatar}`} />
            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <StarIcon 
              key={i} 
              className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} 
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700">{testimonial.content}</p>
    </CardContent>
  </Card>
);

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
          <p className="text-lg text-gray-600">
            Hear from professionals who transformed their careers with FutureScope.AI
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
