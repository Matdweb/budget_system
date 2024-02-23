import { Tour } from "@/types/Tour";

export const createNewTour = async (tour: Tour) => {
    try {
        const response = await fetch('./api/createNewTour', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newTour: tour })
        });

        const data = await response.json();
        return data.status;

    } catch (e) {
        console.log(e);
        return 500;
    }
}
