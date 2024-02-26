import type { Tour } from "@/types/Tour";

export const tourInitialState: Tour = {
    _id: '0',
    name: '',
    duration: 0,
    budget: [],
    expenses: [],
    background: {
        r: 0,
        g: 0,
        b: 0
    }
}