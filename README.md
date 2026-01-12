# 🌉 MX Dev Bridge (HODLOTH Engine)

> **From Solidity Chaos to MultiversX Zen.**  
> Effortlessly transmute your EVM smart contracts into high-performance MultiversX Rust modules.

![MXBridge Banner](public/zensloth_new.png)

## 🚀 Overview

**MX Dev Bridge** is a next-generation developer tool designed to lower the barrier of entry for the MultiversX ecosystem. Powered by the **HODLOTH L3 Engine** (a specialized AI agent running on Groq/Llama-3), it analyzes Solidity code and "transmutes" it into production-ready MultiversX Rust smart contracts.

Unline simple transpilers, HODLOTH understands the *intent* of your code, mapping EVM concepts (like `mapping`, `msg.sender`) to their proper MultiversX equivalents (`StorageMapper`, `blockchain().get_caller()`), all while wrapping you in a calm, zen-like developer experience.

## ✨ Key Features

- **🔥 AI Transmutation**: Paste any Solidity contract (ERC20, NFT, Staking) and watch it convert to Rust in real-time.
- **🧠 Intelligent Insights**: The engine explains *why* changes were made, teaching you MultiversX patterns as you go.
- **⚡ Instant Scaffolding**: One-click download of a full `mxpy` compatible project structure (`wasm`, `meta`, `src`) ready to build.
- **🛡️ Audit Pulse**: Automated safety checks for common pitfalls during migration (Re-entrancy, Gas limits, etc.).
- **💎 Zen UI**: specialized "Glassmorphism" interface with `framer-motion` animations to keep you focused and relaxed.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **AI Engine**: [Groq SDK](https://groq.com/) (Llama-3-70b-versatile)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: CSS Modules + Global Variables (No Tailwind, just pure style)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Zip Generation**: JSZip

## ⚡ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/klepi21/MXBridge.git
   cd MXBridge
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file and add your Groq API key:
   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the Bridge**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` and start transmuting!

## 🧘 The HODLOTH Philosophy

> "Code runs fast, but the developer must be still."

The **HODLOTH** (Hold + Sloth) is our AI mascot. While other tools rush you, the HODLOTH ensures your migration is accurate, secure, and stress-free. Trust the process.

## 🤝 Contributing

We welcome all builders! Please fork the repo and submit a PR.

## 📄 License

MIT © [Konstantinos Lepidas]
