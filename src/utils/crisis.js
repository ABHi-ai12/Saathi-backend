export const detectCrisis = (text) => {
  if (!text || typeof text !== "string") return false;

  const normalizedText = text.toLowerCase().trim();

  // Senior Dev Approach: Using strict word boundaries (\b) to prevent false positives 
  // (e.g., flagging "diet" when searching for "die"), and using Regex for grammatical variations.
  const crisisPatterns = [
    // English Expressions
    /\b(suicide|suicidal|suiciding)\b/,
    /\b(kill(?:ing|ed)?\s+(?:myself|me))\b/,
    /\b(end(?:ing)?\s+(?:my|this)\s+life)\b/,
    /\b(want\s+to\s+die|wish\s+i\s+was\s+dead|don'?t\s+want\s+to\s+live|give\s+up\s+on\s+life)\b/,
    
    // Hinglish Expressions (Crucial for AiDost users)
    /\b(?:mar\s*ja(?:au|un|na|ou)|khudkushi(?: karn[ea])?|jaan\s*de\s*du(?:ngi|nga)?)\b/,
    /\b(?:suicide\s*kar\s*lu(?:ngi|nga)?)\b/,
    /\b(?:zindagi\s*(?:khatam|khatm)|ab\s*jeena\s*nahi(?:n)??|marne\s*ka\s*man)\b/
  ];

  return crisisPatterns.some((pattern) => pattern.test(normalizedText));
};
