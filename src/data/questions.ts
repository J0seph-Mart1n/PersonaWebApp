export type MBTITrait = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

export interface Question {
  id: number;
  trait: MBTITrait;
  vectorName: string;
  text: string;
}

export const questions: Question[] = [
  // Extraversion (E)
  { id: 1, trait: "E", vectorName: "Social Vector", text: "I feel energized and alive after spending time in a large crowd or at a bustling event." },
  { id: 2, trait: "E", vectorName: "Social Vector", text: "I usually find it easy to walk up to strangers and initiate a conversation." },
  
  // Introversion (I)
  { id: 3, trait: "I", vectorName: "Internal Vector", text: "I prefer quiet, one-on-one conversations over lively group activities." },
  { id: 4, trait: "I", vectorName: "Internal Vector", text: "I require a significant amount of alone time to 'recharge' my batteries after socializing." },
  
  // Sensing (S)
  { id: 5, trait: "S", vectorName: "Observation Vector", text: "I prefer clear, concrete facts over philosophical or abstract theories." },
  { id: 6, trait: "S", vectorName: "Observation Vector", text: "When solving a problem, I rely heavily on proven methods and past experiences." },
  
  // Intuition (N)
  { id: 7, trait: "N", vectorName: "Perception Vector", text: "I frequently catch myself daydreaming about future possibilities and hidden meanings." },
  { id: 8, trait: "N", vectorName: "Perception Vector", text: "I enjoy brainstorming wild, unconventional ideas even if they aren't immediately practical." },
  
  // Thinking (T)
  { id: 9, trait: "T", vectorName: "Logic Vector", text: "I prioritize cold, hard logic and objective truth over how people might feel about a decision." },
  { id: 10, trait: "T", vectorName: "Logic Vector", text: "In a disagreement, finding the correct answer is more important than maintaining harmony." },
  
  // Feeling (F)
  { id: 11, trait: "F", vectorName: "Empathy Vector", text: "I am highly attuned to the emotional needs and moods of the people around me." },
  { id: 12, trait: "F", vectorName: "Empathy Vector", text: "I base my most important life choices on what aligns with my personal values and empathy." },
  
  // Judging (J)
  { id: 13, trait: "J", vectorName: "Structure Vector", text: "I prefer to have a strict, detailed schedule and stick to it no matter what." },
  { id: 14, trait: "J", vectorName: "Structure Vector", text: "I feel highly stressed when my workspace or daily routine is messy and unpredictable." },
  
  // Perceiving (P)
  { id: 15, trait: "P", vectorName: "Adaptability Vector", text: "I like to keep my options open and prefer to act spontaneously as situations arise." },
  { id: 16, trait: "P", vectorName: "Adaptability Vector", text: "I tend to work best in sudden bursts of energy right before a deadline rather than making steady, daily progress." },
];
