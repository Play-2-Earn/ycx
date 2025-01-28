import React from "react";
import { useNavigate } from "react-router-dom";
import { Rocket, Target, Users } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Connect with cutting-edge YC startups to solve your business
              challenges
            </h1>
            <p className="text-xl mb-8">
              We match your business with the perfect YC startup solutions to
              drive growth and innovation
            </p>
            <button
              onClick={() => navigate("/submit-lead")}
              className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Find My Solution
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <FeatureCard
              icon={<Target className="w-12 h-12 text-indigo-600" />}
              title="Smart Matching"
              description="Our AI-powered platform matches your business needs with the perfect YC startup solutions"
            />
            <FeatureCard
              icon={<Rocket className="w-12 h-12 text-indigo-600" />}
              title="Fast Implementation"
              description="Get up and running quickly with guided onboarding and dedicated support"
            />
            <FeatureCard
              icon={<Users className="w-12 h-12 text-indigo-600" />}
              title="Expert Support"
              description="Access to a network of industry experts and startup founders"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;
