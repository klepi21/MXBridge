"use client";

import { motion } from "framer-motion";
import { Flame, Zap, Terminal } from "lucide-react";
import { useState, useEffect } from "react";

interface BridgePanelProps {
    solidityCode: string;
    rustCode: string;
    onSolidityChange: (code: string) => void;
    isTranslating: boolean;
}

export default function BridgePanel({ solidityCode, rustCode, onSolidityChange, isTranslating }: BridgePanelProps) {
    const [displayedRust, setDisplayedRust] = useState("");

    useEffect(() => {
        if (rustCode) {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedRust(rustCode.slice(0, i));
                i += 15; // Fast streaming
                if (i > rustCode.length) clearInterval(interval);
            }, 10);
            return () => clearInterval(interval);
        } else {
            setDisplayedRust("");
        }
    }, [rustCode]);

    return (
        <div style={{ flex: 1, display: "flex", gap: "20px", padding: "20px", height: "calc(100vh - 40px)" }}>
            {/* Solidity Panel */}
            <div className="glass-card fire-glow" style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(26, 26, 31, 0.8)" }}>
                <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "#f87171" }}>
                        <Flame size={18} /> Solidity (EVM)
                    </span>
                    <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>CONTRACT.SOL</span>
                </div>
                <textarea
                    value={solidityCode}
                    onChange={(e) => onSolidityChange(e.target.value)}
                    placeholder="// Paste your Solidity contract here..."
                    className="code-font"
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#fb923c",
                        fontSize: "0.9rem",
                        padding: "20px",
                        resize: "none",
                        lineHeight: "1.6"
                    }}
                />
            </div>

            {/* Rust Panel */}
            <motion.div
                layout
                className="glass-card lightning-glow"
                style={{ flex: 1, display: "flex", flexDirection: "column", background: "rgba(14, 165, 233, 0.03)" }}
            >
                <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--glass-border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "600", color: "#38bdf8" }}>
                        <Zap size={18} /> MultiversX Rust
                    </span>
                    <span style={{ fontSize: "0.75rem", opacity: 0.5 }}>LIB.RS</span>
                </div>
                <div className="code-font" style={{ flex: 1, overflow: "auto", padding: "20px", whiteSpace: "pre-wrap", fontSize: "0.9rem", color: "#e2e8f0", lineHeight: "1.6" }}>
                    {isTranslating ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity }} style={{ height: "1em", width: "80%", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }} />
                            <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, delay: 0.2 }} style={{ height: "1em", width: "60%", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }} />
                            <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, delay: 0.4 }} style={{ height: "1em", width: "90%", background: "rgba(255,255,255,0.1)", borderRadius: "2px" }} />
                        </div>
                    ) : (
                        displayedRust || <span style={{ opacity: 0.3 }}>// Transmuted code will appear here...</span>
                    )}
                </div>
                <div style={{ padding: "12px 20px", borderTop: "1px solid var(--glass-border)", display: "flex", gap: "15px", alignItems: "center", background: "rgba(0,0,0,0.2)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "#38bdf8" }}>
                        <Terminal size={14} /> Output: {isTranslating ? "Processing..." : "Ready"}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
