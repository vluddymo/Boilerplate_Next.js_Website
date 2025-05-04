export type Suit = "Herz" | "Pik" | "Kreuz" | "Karo";
export type Rank = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" ;

export class Card {
    constructor(public suit: Suit, public rank: Rank) {}

    toString(): string {
        return `${this.rank} of ${this.suit}`;
    }
}