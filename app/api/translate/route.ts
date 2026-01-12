import { NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(req: Request) {
    try {
        const { solidityCode, apiKey: userApiKey } = await req.json();
        const apiKey = userApiKey || process.env.GROQ_API_KEY;

        console.log("Translation request received. Key present:", !!apiKey);

        if (!apiKey) {
            console.log("No API Key found, returning mock.");
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

        console.log("Calling Groq with model: llama-3.3-70b-versatile");
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `You are the HODLOTH AI, a master MultiversX Rust architect. 
                    Your goal is to "transmute" Solidity into high-performance, secure MultiversX Rust.
                    
                    Follow these rules:
                    1. Use #[multiversx_sc::contract] and traits.
                    2. Map EVM 'mappings' to #[storage_mapper] and use SingleValueMapper or VecMapper.
                    3. Use Managed types exclusively: BigUint, ManagedAddress, ManagedBuffer.
                    4. Replace 'msg.sender' with 'self.blockchain().get_caller()'.
                    5. Replace 'msg.value' with 'self.call_value().egld_value()'.
                    6. Ensure #[view] and #[endpoint] attributes are used correctly.
                    7. Output MUST be a JSON object with 'rustCode' (string) and 'explanations' (array of strings explaining the key architectural shifts).`
                },
                {
                    role: "user",
                    content: `Convert this Solidity contract to MultiversX Rust: \n\n ${solidityCode}`
                }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" }
        });

        const content = completion.choices[0]?.message?.content;
        console.log("Groq Response received.");

        if (!content) {
            throw new Error("Empty response from Groq");
        }

        return NextResponse.json(JSON.parse(content));
    } catch (error: any) {
        console.error("Translation error details:", error?.message || error);
        return NextResponse.json({
            error: "Failed to translate",
            details: error?.message || "Unknown error"
        }, { status: 500 });
    }
}
