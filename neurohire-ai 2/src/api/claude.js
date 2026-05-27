// ──────────────────────────────────────────────
//  NeuroHire AI  ·  Claude API Client
// ──────────────────────────────────────────────

import { MODEL, ANTHROPIC_API_URL } from "../data/constants";

/**
 * Call the Claude API.
 * @param {Array<{role: string, content: string}>} messages
 * @param {string} system  — Optional system prompt
 * @returns {Promise<string>}  — Text response from the model
 */
export async function callClaude(messages, system = "") {
  try {
    const response = await fetch(ANTHROPIC_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1000,
        system,
        messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.content?.[0]?.text || "";
  } catch (err) {
    console.error("[NeuroHire] Claude API call failed:", err);
    return `Error: ${err.message}`;
  }
}

/**
 * Parse a JSON response from Claude, stripping markdown fences.
 * @param {string} text
 * @param {*} fallback  — Returned on parse failure
 */
export function parseJsonResponse(text, fallback = null) {
  try {
    const clean = text.replace(/```json|```/g, "").trim();
    return JSON.parse(clean);
  } catch {
    console.warn("[NeuroHire] JSON parse failed for response:", text.slice(0, 100));
    return fallback;
  }
}
