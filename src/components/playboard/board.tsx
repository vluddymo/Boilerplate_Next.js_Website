'use client'

import {useState} from "react";

import type {Dictionary, Locale} from "@/types";
import {generateDeck} from "@/utils/deck";


interface BoardProps {
    locale: Locale;
    dict: Dictionary;
}

export default function Board({locale, dict}: BoardProps) {
    const deck = generateDeck();
    const [numberOfPlayers, setNumberOfPlayers] = useState<number | ''>('');
    const [start, setStart] = useState(false);

    return (

        <>
            {start && numberOfPlayers &&
                <div className="deck flex">
                    {deck.map((card, index) => (
                        <li key={index} className="border-2 p-2 rounded">
                            {card.toString()}
                        </li>
                    ))};
                </div>
            }
            { !start &&
                <>
                <label className="block mb-2 font-medium" htmlFor="players">
                    Anzahl Spieler:
                </label>
                <input
                    className="border p-2 rounded w-full"
                    id="players"
                    max={6}
                    min={2}
                    type="number"
                    value={numberOfPlayers}
                    onChange={(e) => {
                        const value = e.target.value;
                        setNumberOfPlayers(value === '' ? '' : parseInt(value, 10));
                    }}
                />
                <button
                    className={`btn btn-primary ${!numberOfPlayers || numberOfPlayers < 2 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!numberOfPlayers || numberOfPlayers < 2}
                    onClick={() => setStart(true)}
                >
                    {dict.pages.home.cta}
                </button>
                </>
            }
        </>

    )
}