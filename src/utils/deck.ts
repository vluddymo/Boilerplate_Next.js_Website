import type { Suit, Rank } from "@/types/Card";
import { Card } from "@/types/Card"

export function generateDeck(): Card[] {
    const suits: Suit[] = ['Herz', 'Pik', 'Kreuz', 'Karo'];
    const ranks: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    const deck: Card[] = [];

    for (const suit of suits){
        for (const rank of ranks){
            deck.push(new Card(suit, rank))
        }
    }
    return deck;
}