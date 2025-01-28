import React, { useContext, useState } from "react";
import {
  Building2,
  Phone,
  Mail,
  Globe,
  Rocket,
  Zap,
  Users,
  BarChart,
} from "lucide-react";
import { LeadContext } from "../Context/LeadContext";

const YCXLeadForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    website: "",
  });

  const {addLead , success } = useContext(LeadContext)
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // const response = await fetch("/api/leads", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(formData),
      // });

      // if (!response.ok) throw new Error("Submission failed");

      // setStatus({
      //   type: "success",
      //   message:
      //     "🚀 Success! Your YCX matching process has started. We'll contact you within 24 hours.",
      // });
     const response = await addLead(formData)
      setFormData({ name: "", phone: "", email: "", website: "" });
      console.log(response.message)
    } catch (error) {
      // setStatus({
      //   type: "error",
      //   message:
      //     "⚠️ Connection failed. Please try again or contact support@ycx.ai",
      // });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 space-y-8 lg:space-y-0">
      {/* Left Side - Value Proposition */}
      <div className="lg:w-1/2 max-w-xl text-center lg:text-left p-4 sm:p-8">
        <div className="flex items-center gap-3 mb-8 justify-center lg:justify-start"></div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          <span className="text-blue-600">Yield Customer Experience</span> with
          AI-Matched YC Solutions
        </h1>

        <div className="space-y-6 mb-12">
          <div className="flex items-start gap-4">
            <Zap className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Streamlined AI Matching
              </h3>
              <p className="text-gray-600">
                Connect with pre-vetted YC startups in 72 hours through our
                AI-enhanced consultative process
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Users className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Exclusive SMB Network
              </h3>
              <p className="text-gray-600">
                Join 2,300+ qualified businesses accelerating growth with YC
                partnerships
              </p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl space-y-4">
          <div className="flex items-center gap-4">
            <BarChart className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                Last Month's Success Metrics
              </p>
              <div className="flex gap-6 mt-2">
                <div>
                  <p className="text-2xl font-bold text-gray-900">94%</p>
                  <p className="text-sm text-gray-600">Match Rate</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">37h</p>
                  <p className="text-sm text-gray-600">Avg. Connect Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Conversion Form */}
      <div className="lg:w-1/2 max-w-xl w-full">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-6 sm:p-10">
            <div className="mb-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Start Your YCX Matching
              </h2>
              <p className="text-gray-500">
                Complete your profile to begin AI matching
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {Object.entries(formData).map(([key, value]) => {
                const icons = {
                  name: <Building2 className="h-5 w-5 text-gray-400" />,
                  phone: <Phone className="h-5 w-5 text-gray-400" />,
                  email: <Mail className="h-5 w-5 text-gray-400" />,
                  website: <Globe className="h-5 w-5 text-gray-400" />,
                };

                return (
                  <div key={key} className="relative group">
                    <div className="absolute left-3 top-3.5">{icons[key]}</div>
                    <input
                      type={
                        key === "email"
                          ? "email"
                          : key === "phone"
                          ? "tel"
                          : key === "website"
                          ? "url"
                          : "text"
                      }
                      name={key}
                      value={value}
                      onChange={handleInputChange}
                      placeholder={
                        key === "name"
                          ? "Business Legal Name"
                          : key === "phone"
                          ? "Direct Contact Number"
                          : key === "email"
                          ? "Business Email Address"
                          : "Company Website URL"
                      }
                                            className="w-full pl-12 pr-6 py-3.5 bg-gray-50/50 rounded-lg border border-gray-200 text-gray-900 placeholder-gray-400
                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all
                        group-hover:border-gray-300"
                    />
                  </div>
                );
              })}

              {status.message && (
                <div
                  className={`p-4 rounded-lg ${
                    status.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
                >
                  {status.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 px-6 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold
                  hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/30
                  transform transition-all duration-300 flex items-center justify-center gap-2
                  ${
                    isSubmitting
                      ? "opacity-85"
                      : "hover:scale-[1.02] active:scale-95"
                  }`}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Matching...</span>
                ) : (
                  <>
                    <span>Start AI Matching</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8">
              <p className="text-center text-gray-500 text-sm">
                Protected by YCX's{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Enterprise-Grade Security
                </a>
              </p>
              <div className="flex justify-center gap-4 mt-4">
                {[
                  /* Add partner logos here */
                ].map((logo, index) => (
                  <img
                    key={index}
                    src={logo}
                    className="h-8 opacity-60 hover:opacity-100 transition-opacity"
                    alt="Partner logo"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YCXLeadForm;
