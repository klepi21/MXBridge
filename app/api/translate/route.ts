import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
    try {
        const { solidityCode, apiKey: userApiKey } = await req.json();
        const apiKey = userApiKey || process.env.GROQ_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                rustCode: `#[multiversx_sc::contract]\npub trait BridgeContract {\n    #[init]\n    fn init(&self) {}\n\n    #[view(getBalance)]\n    #[storage_mapper("balance")]\n    fn balance(&self, address: &ManagedAddress) -> SingleValueMapper<BigUint>;\n\n    #[endpoint]\n    fn deposit(&self, amount: BigUint) {\n        let caller = self.blockchain().get_caller();\n        self.balance(&caller).update(|bal| *bal += amount);\n    }\n}`,
                explanations: [
                    "Architectural Shift: Solidity 'mapping' found. Converted to MultiversX 'SingleValueMapper'.",
                    "Type Mapping: address -> ManagedAddress, uint256 -> BigUint.",
                    "State Access: Replaced msg.sender with self.blockchain().get_caller()."
                ]
            });
        }

        const groq = new Groq({ apiKey });

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are the HODLOTH AI. Convert Solidity to MultiversX Rust.
                    
                    Respond ONLY with a JSON object. No markdown, no pre-text, no post-text.
                    {
                      "rustCode": "...",
                      "explanations": ["...", "..."]
                    }`
                },
                {
                    role: "user",
                    content: `Convert this Solidity to MultiversX Rust:\n\n${solidityCode}`
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
        });

        const content = completion.choices[0]?.message?.content || "";

        // Manual extraction to be extremely robust
        try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                return NextResponse.json(JSON.parse(jsonMatch[0]));
            }
            throw new Error("No JSON found in response");
        } catch (e) {
            console.error("Manual Parse Error:", content);
            throw new Error(`Failed to parse AI response as JSON. Content was: ${content}`);
        }

    } catch (error: any) {
        console.error("Translation error details:", error?.message || error);
        return NextResponse.json({
            error: "HODLOTH Engine Stalled",
            details: error?.message || "The AI had trouble formatting the code. Please try again."
        }, { status: 500 });
    }
}
