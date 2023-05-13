type item = {
    id: string
    price: number
    image: string
}

type comment = {
    id: string
    rating: number
}

export const data: item[] = [
    { id: 'Scamble Egg', price: 20_000, image: "egg.png" },
    { id: 'Pizza', price: 30_000, image: "pizza.jpg" },
]

export const comments: comment[] = [
    { id: 'Scamble Egg', rating: 5 },
    { id: 'Pizza', rating: 1.5 }
]