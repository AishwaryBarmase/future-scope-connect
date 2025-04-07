
import Header from "@/components/Header";
import LoginForm from "@/components/LoginForm";
import Footer from "@/components/Footer";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Welcome Back to FutureScope.AI</h2>
            <p className="text-lg text-gray-600">
              Log in to continue your personalized career journey
            </p>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
