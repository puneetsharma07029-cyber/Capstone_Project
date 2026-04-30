import React from 'react'
import { useState } from "react";
import Header from "./components/Header";
import DecisionForm from "./components/DecisionForm";
import ResultsSection from "./components/ResultsSection";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

// 🔑 APNI OPENAI API KEY YAHAN DAALEIN
const OPENAI_API_KEY = "YOUR_API_KEY_HERE";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeOptions = async (option1, option2, context) => {
    setLoading(true);
    setError("");
    setResults(null);

    const prompt = `
You are a smart decision-making assistant. The user is trying to decide between two options.

Option A: ${option1}
Option B: ${option2}
${context ? `Additional Context: ${context}` : ""}

Respond ONLY in this exact JSON format, no extra text:
{
  "option1": {
    "name": "${option1}",
    "pros": ["pro 1", "pro 2", "pro 3"],
    "cons": ["con 1", "con 2", "con 3"],
    "score": <number 1-10>
  },
  "option2": {
    "name": "${option2}",
    "pros": ["pro 1", "pro 2", "pro 3"],
    "cons": ["con 1", "con 2", "con 3"],
    "score": <number 1-10>
  },
  "recommendation": {
    "winner": "<option1 or option2>",
    "reason": "<2-3 sentence explanation>"
  }
}
    `;

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const apiMsg = data?.error?.message || `Status ${response.status}`;
        throw new Error("OpenAI API Error: " + apiMsg);
      }

      const rawText = data.choices[0].message.content;
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("Try Again.");
      setResults(JSON.parse(jsonMatch[0]));

    } catch (err) {
      if (err.name === "TypeError") {
        setError("Network error — Check your internet connection.");
      } else {
        setError(err.message || "Something Wrong. Try Again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResults(null);
    setError("");
  };

  return (
    <div className="app">
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      <div className="container">
        <Header />

        {!results && !loading && (
          <DecisionForm onAnalyze={analyzeOptions} loading={loading} />
        )}

        {error && (
          <div className="error-box">
            <span>⚠️</span> {error}
          </div>
        )}

        {loading && <LoadingSpinner />}

        {results && (
          <ResultsSection results={results} onReset={handleReset} />
        )}
      </div>
    </div>
  );
}

export default App;
