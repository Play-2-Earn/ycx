import React, { useState } from "react";
import {
  Building2,
  Users,
  MapPin,
  BarChart,
  Server,
  Target,
  Plus,
  X,
  Loader2,
} from "lucide-react";

const LeadForm = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    revenue: "",
    employees: "",
    location: "",
    painPoints: [""],
    cltv: "",
    art: "",
    satisfaction: "",
    crm: "",
    supportSoftware: "",
    aiTools: "",
    goals: [""],
    additionalNotes: "",
  });

  const industries = [
    "E-commerce",
    "Logistics",
    "Retail",
    "Healthcare",
    "Technology",
    "Manufacturing",
    "Finance",
    "Education",
    "Other",
  ];

  const revenueRanges = ["<$1M", "$1M–$5M", "$5M–$10M", ">$10M"];

  const employeeRanges = ["<10", "10–50", "50–100", ">100"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle dynamic pain points
  const addPainPoint = () => {
    setFormData((prev) => ({
      ...prev,
      painPoints: [...prev.painPoints, ""],
    }));
  };

  const removePainPoint = (index) => {
    setFormData((prev) => ({
      ...prev,
      painPoints: prev.painPoints.filter((_, i) => i !== index),
    }));
  };

  const updatePainPoint = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      painPoints: prev.painPoints.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  // Handle dynamic goals
  const addGoal = () => {
    setFormData((prev) => ({
      ...prev,
      goals: [...prev.goals, ""],
    }));
  };

  const removeGoal = (index) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }));
  };

  const updateGoal = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.map((item, i) => (i === index ? value : item)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          painPoints: formData.painPoints.filter(
            (point) => point.trim() !== ""
          ),
          goals: formData.goals.filter((goal) => goal.trim() !== ""),
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSuccess(true);
      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          companyName: "",
          industry: "",
          revenue: "",
          employees: "",
          location: "",
          painPoints: [""],
          cltv: "",
          art: "",
          satisfaction: "",
          crm: "",
          supportSoftware: "",
          aiTools: "",
          goals: [""],
          additionalNotes: "",
        });
        setStep(1);
        setSuccess(false);
      }, 3000);
    } catch (err) {
      setError("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderDynamicInputs = (
    field,
    items,
    addItem,
    removeItem,
    updateItem,
    placeholder
  ) => (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => updateItem(index, e.target.value)}
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder={placeholder}
          />
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="p-2 text-gray-500 hover:text-red-500 focus:outline-none"
            disabled={items.length === 1}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-700 focus:outline-none"
      >
        <Plus className="w-4 h-4" />
        Add {field}
      </button>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              Basic Business Information
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Industry
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Industry</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Annual Revenue
                  </label>
                  <select
                    name="revenue"
                    value={formData.revenue}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Revenue Range</option>
                    {revenueRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Number of Employees
                  </label>
                  <select
                    name="employees"
                    value={formData.employees}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Employee Range</option>
                    {employeeRanges.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="City, State/Region"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <BarChart className="w-6 h-6" />
              Customer Experience Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Pain Points
                </label>
                {renderDynamicInputs(
                  "Pain Point",
                  formData.painPoints,
                  addPainPoint,
                  removePainPoint,
                  updatePainPoint,
                  "Describe a key challenge your business faces..."
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Average Customer Lifetime Value
                  </label>
                  <input
                    type="text"
                    name="cltv"
                    value={formData.cltv}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., $1,000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Average Resolution Time
                  </label>
                  <input
                    type="text"
                    name="art"
                    value={formData.art}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., 24 hours"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Customer Satisfaction
                  </label>
                  <input
                    type="text"
                    name="satisfaction"
                    value={formData.satisfaction}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., 4.5/5"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
              <Server className="w-6 h-6" />
              Tech Stack & Goals
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CRM System
                  </label>
                  <input
                    type="text"
                    name="crm"
                    value={formData.crm}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., HubSpot, Salesforce"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Support Software
                  </label>
                  <input
                    type="text"
                    name="supportSoftware"
                    value={formData.supportSoftware}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Zendesk, Freshdesk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Current AI Tools
                  </label>
                  <input
                    type="text"
                    name="aiTools"
                    value={formData.aiTools}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="e.g., Chatbots, Analytics"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Goals
                </label>
                {renderDynamicInputs(
                  "Goal",
                  formData.goals,
                  addGoal,
                  removeGoal,
                  updateGoal,
                  "Describe a goal you want to achieve..."
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  rows={4}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Please share any additional information about your challenges and vision..."
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-900">
              YCX.ai Business Profile
            </h1>
            <p className="text-gray-600 mt-2">
              Help us understand your business better
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex-1 relative">
                <button
                  onClick={() => setStep(stepNumber)}
                  disabled={loading}
                  className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto
                    ${
                      step === stepNumber
                        ? "bg-blue-600 text-white"
                        : step > stepNumber
                        ? "bg-blue-200 text-blue-800"
                        : "bg-gray-100 text-gray-500"
                    } transition-all duration-200`}
                >
                  {stepNumber}
                </button>
                <div className="text-xs text-center mt-2 text-gray-600">
                  {stepNumber === 1
                    ? "Business Info"
                    : stepNumber === 2
                    ? "Customer Experience"
                    : "Tech & Goals"}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`absolute top-5 left-1/2 w-full h-0.5 
                    ${step > stepNumber ? "bg-blue-200" : "bg-gray-100"}`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Success Message */}
          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Thank you! Your information has been successfully submitted.
              </AlertDescription>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert className="mb-6 bg-red-50 border-red-200">
              <AlertDescription className="text-red-800">
                {error}
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {renderStepContent()}

            <div className="mt-8 flex justify-between pt-5 border-t border-gray-200">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  disabled={loading}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 transition-colors duration-200"
                >
                  Previous
                </button>
              )}
              {step < 3 ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={loading}
                  className={`${
                    step === 1 ? "mx-auto" : "ml-auto"
                  } px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200 flex items-center gap-2`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-colors duration-200 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LeadForm;
