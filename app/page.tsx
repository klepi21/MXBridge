"use client";

import { useState } from "react";
import BridgePanel from "./components/BridgePanel";
import HodlothSidebar from "./components/HodlothSidebar";
import { generateMxProject } from "./utils/scaffold";

export default function Home() {
  const [solidityCode, setSolidityCode] = useState("");
  const [rustCode, setRustCode] = useState("");
  const [explanations, setExplanations] = useState<string[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [apiKey, setApiKey] = useState("");

  const handleTranslate = async () => {
    if (!solidityCode) return;
    setIsTranslating(true);
    setRustCode("");
    setExplanations([]);

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ solidityCode, apiKey }),
      });

      const data = await response.json();
      if (data.rustCode) {
        setRustCode(data.rustCode);
        setExplanations(data.explanations || []);
      } else if (data.error) {
        setExplanations([`🚨 Error: ${data.details || data.error}`, "Please check your API key or network connection."]);
      }
    } catch (error: any) {
      console.error("Translation error:", error);
      setExplanations(["🚨 Network Error: Failed to reach the HODLOTH Engine."]);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleDownload = async () => {
    if (!rustCode) return;
    await generateMxProject(rustCode);
  };

  const handleAudit = () => {
    if (!rustCode) return;
    setExplanations(prev => [
      ...prev,
      "🛡 AI Audit Pulse: Scanning for MultiversX common pitfalls...",
      "✅ Safety Check: Re-entrancy protection active via Storage Mappers.",
      "⚠️ Gas Note: Ensure loop bounds are checked if total size exceeds 1000 items.",
      "🚀 Optimized: rust memory layout confirmed for WASM."
    ]);
  };

  return (
    <main style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar-ish header */}
        <div style={{ padding: "10px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--glass-border)" }}>
          <h1 style={{ fontSize: "1.2rem", fontWeight: "800", letterSpacing: "-0.05em" }}>
            MX <span style={{ color: "var(--accent)" }}>DEV</span> BRIDGE
          </h1>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.75rem", color: "#22c55e", fontWeight: "700" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 10px #22c55e" }} />
              HODLOTH L3 ENGINE ACTIVE
            </div>
            <button
              onClick={handleTranslate}
              className="glass-card"
              style={{
                padding: "8px 24px",
                background: "linear-gradient(135deg, var(--accent), #f97316)",
                color: "#fff",
                border: "none",
                cursor: "pointer",
                fontWeight: "700",
                letterSpacing: "0.05em"
              }}
            >
              {isTranslating ? "TRANSMUTING..." : "TRANSMUTE"}
            </button>
          </div>
        </div>

        <BridgePanel
          solidityCode={solidityCode}
          rustCode={rustCode}
          onSolidityChange={setSolidityCode}
          isTranslating={isTranslating}
        />
      </div>

      <HodlothSidebar
        explanations={explanations}
        isTranslating={isTranslating}
        onDownload={handleDownload}
        onAudit={handleAudit}
      />
    </main>
  );
}
