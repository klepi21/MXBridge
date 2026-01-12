"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Brain, ShieldCheck, Download } from "lucide-react";
import Image from "next/image";

interface HodlothSidebarProps {
    explanations: string[];
    isTranslating: boolean;
    onDownload: () => void;
    onAudit: () => void;
}

export default function HodlothSidebar({ explanations, isTranslating, onDownload, onAudit }: HodlothSidebarProps) {
    return (
        <div className="glass-card" style={{
            width: "320px",
            height: "calc(100vh - 40px)",
            margin: "20px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
        }}>
            <div style={{ padding: "24px", textAlign: "center", borderBottom: "1px solid var(--glass-border)" }}>
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                    <Image
                        src="/zensloth_new.png"
                        alt="HODLOTH AI"
                        width={120}
                        height={120}
                        style={{ borderRadius: "50%", border: "2px solid var(--accent)" }}
                    />
                </motion.div>
                <h2 style={{ marginTop: "16px", fontSize: "1.25rem", fontWeight: "700", color: "var(--accent)" }}>
                    HODLOTH AI
                </h2>
                <p style={{ fontSize: "0.875rem", opacity: 0.7 }}>Master of Bridge & Zen</p>
            </div>

            <div style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
                <h3 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--accent)", marginBottom: "16px" }}>
                    <Brain size={16} /> Insights
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <AnimatePresence>
                        {explanations.map((text, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="streaming-text"
                                style={{
                                    padding: "12px",
                                    background: "rgba(255,255,255,0.03)",
                                    borderRadius: "8px",
                                    fontSize: "0.85rem",
                                    lineHeight: "1.5",
                                    borderLeft: "2px solid var(--accent)"
                                }}
                            >
                                {text}
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {isTranslating && (
                        <motion.div
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            style={{ fontSize: "0.85rem", opacity: 0.5, fontStyle: "italic" }}
                        >
                            Analyzing architectural mappings...
                        </motion.div>
                    )}

                    {explanations.length === 0 && !isTranslating && (
                        <p style={{ textAlign: "center", opacity: 0.5, fontSize: "0.85rem", marginTop: "40px" }}>
                            Paste your Solidity code to begin the Zen translation journey.
                        </p>
                    )}
                </div>
            </div>

            <div style={{ padding: "20px", borderTop: "1px solid var(--glass-border)", display: "flex", flexDirection: "column", gap: "10px" }}>
                <button
                    onClick={onAudit}
                    className="glass-card"
                    style={{
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        background: "rgba(249, 115, 22, 0.1)",
                        color: "var(--accent)",
                        border: "1px solid var(--accent)"
                    }}>
                    <ShieldCheck size={18} /> Simulate Audit
                </button>
                <button
                    onClick={onDownload}
                    className="glass-card"
                    style={{
                        width: "100%",
                        padding: "12px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        background: "rgba(14, 165, 233, 0.1)",
                        color: "#0ea5e9",
                        border: "1px solid #0ea5e9"
                    }}>
                    <Download size={18} /> Download Project
                </button>
            </div>
        </div>
    );
}
