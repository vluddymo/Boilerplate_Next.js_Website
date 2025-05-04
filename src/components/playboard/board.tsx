'use client'

export function board{
    return (

        <div className="deck flex">
            {deck.map((card, index) => (
                    <li key={index} className="border-2 p-2 rounded">
                {card.toString()}
                </li>
    ))};
    </div>

    )
}