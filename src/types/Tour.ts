export type Tour = {
    _id: string,
    name: string,
    duration: number,
    budget: number[],
    expenses: number[],
    background: {
        r: number,
        g: number,
        b: number
    }
}