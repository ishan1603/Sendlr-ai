"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const categories = [
  {
    id: "technology",
    name: "Technology",
    description: "Latest tech news and innovations",
  },
  {
    id: "business",
    name: "Business",
    description: "Business trends and market updates",
  },
  { id: "sports", name: "Sports", description: "Sports news and highlights" },
  {
    id: "entertainment",
    name: "Entertainment",
    description: "Movies, TV, and celebrity news",
  },
  {
    id: "science",
    name: "Science",
    description: "Scientific discoveries and research",
  },
  { id: "health", name: "Health", description: "Health and wellness updates" },
  {
    id: "politics",
    name: "Politics",
    description: "Political news and current events",
  },
  {
    id: "environment",
    name: "Environment",
    description: "Climate and environmental news",
  },
];

const frequencyOptions = [
  { id: "daily", name: "Daily", description: "Every day" },
  { id: "weekly", name: "Weekly", description: "Once a week" },
  { id: "biweekly", name: "Bi-weekly", description: "Twice a week" },
];

export default function SelectPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFrequency, setSelectedFrequency] = useState<string>("weekly");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // useEffect(() => {
  //   fetch("/api/subscription-status")
  //     .then((r) => r.json())
  //     .then((json) => {
  //       if (!json.active) {
  //         router.replace("/subscribe");
  //       }
  //     })
  //     .catch(() => {
  //       router.replace("/subscribe");
  //     });
  // }, [router]);

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      alert("Please select at least one category");
      return;
    }

    if (!user) {
      alert("Please sign in to continue");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch("/api/user-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categories: selectedCategories,
          frequency: selectedFrequency,
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      alert(
        "Your newsletter preferences have been saved! You'll start receiving newsletters according to your schedule."
      );
      router.push("/dashboard");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to save preferences. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-[16px] text-black mb-4">CUSTOMIZE NEWSLETTER</h1>
          <p className="text-[12px] text-black">
            SELECT INTERESTS AND DELIVERY FREQUENCY
          </p>
        </div>

        <form onSubmit={handleSavePreferences} className="card bg-white p-6">
          {/* Categories Section */}
          <div className="mb-8">
            <h2 className="text-[14px] text-black mb-4">CHOOSE CATEGORIES</h2>
            <p className="text-[10px] text-black mb-6">
              SELECT TOPICS FOR YOUR PERSONALIZED NEWSLETTER
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {categories.map((category) => (
                <label
                  key={category.id}
                  className={`relative flex items-start p-4 border-2 border-black cursor-pointer transition-all ${
                    selectedCategories.includes(category.id)
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                  style={{
                    boxShadow: selectedCategories.includes(category.id)
                      ? "none"
                      : "2px 2px 0px #000000",
                  }}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryToggle(category.id)}
                  />
                  <div className="flex items-center h-5">
                    <div
                      className={`w-4 h-4 border-2 flex items-center justify-center ${
                        selectedCategories.includes(category.id)
                          ? "border-white bg-white"
                          : "border-black bg-white"
                      }`}
                    >
                      {selectedCategories.includes(category.id) && (
                        <div className="w-2 h-2 bg-black"></div>
                      )}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div
                      className="text-[10px] font-normal"
                      style={{ fontFamily: "Press Start 2P" }}
                    >
                      {category.name.toUpperCase()}
                    </div>
                    <div
                      className="text-[8px] mt-1"
                      style={{ fontFamily: "Press Start 2P" }}
                    >
                      {category.description.toUpperCase()}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="text-[10px] text-black mb-6">
              {selectedCategories.length} CATEGOR
              {selectedCategories.length !== 1 ? "IES" : "Y"} SELECTED
            </div>
          </div>

          {/* Frequency Section */}
          <div className="mb-8">
            <h2 className="text-[14px] text-black mb-4">DELIVERY FREQUENCY</h2>
            <p className="text-[10px] text-black mb-6">
              HOW OFTEN TO RECEIVE NEWSLETTER?
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {frequencyOptions.map((frequency) => (
                <label
                  key={frequency.id}
                  className={`relative flex items-start p-4 border-2 border-black cursor-pointer transition-all ${
                    selectedFrequency === frequency.id
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-black hover:text-white"
                  }`}
                  style={{
                    boxShadow:
                      selectedFrequency === frequency.id
                        ? "none"
                        : "2px 2px 0px #000000",
                  }}
                >
                  <input
                    type="radio"
                    name="frequency"
                    className="sr-only"
                    checked={selectedFrequency === frequency.id}
                    onChange={() => setSelectedFrequency(frequency.id)}
                  />
                  <div className="flex items-center h-5">
                    <div
                      className={`w-4 h-4 border-2 flex items-center justify-center ${
                        selectedFrequency === frequency.id
                          ? "border-white bg-white"
                          : "border-black bg-white"
                      }`}
                    >
                      {selectedFrequency === frequency.id && (
                        <div className="w-2 h-2 bg-black"></div>
                      )}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div
                      className="text-[10px] font-normal"
                      style={{ fontFamily: "Press Start 2P" }}
                    >
                      {frequency.name.toUpperCase()}
                    </div>
                    <div
                      className="text-[8px] mt-1"
                      style={{ fontFamily: "Press Start 2P" }}
                    >
                      {frequency.description.toUpperCase()}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <div className="text-[10px] text-black">
              {selectedCategories.length} CATEGOR
              {selectedCategories.length !== 1 ? "IES" : "Y"} •{" "}
              {selectedFrequency.toUpperCase()}
            </div>
            <button
              type="submit"
              disabled={selectedCategories.length === 0 || isSaving}
              className={`px-6 py-3 border-2 border-black text-[10px] font-normal cursor-pointer transition-all ${
                selectedCategories.length === 0 || isSaving
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-white text-black hover:bg-black hover:text-white"
              }`}
              style={{
                fontFamily: "Press Start 2P",
                boxShadow:
                  selectedCategories.length === 0 || isSaving
                    ? "none"
                    : "3px 3px 0px #000000",
              }}
            >
              {isSaving ? "SAVING..." : "SAVE PREFERENCES"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
