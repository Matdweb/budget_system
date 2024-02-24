import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import Tour from "@/models/tourSchema";
import type { Tour as TourType } from "@/types/Tour";

export async function POST(request: Request) {

    try {
        const { newTour: { name, duration, budget, expenses } }: { newTour: TourType } = await request.json();

        //creates a random rgb background
        const background = {
            r: Math.floor(Math.random() * 256) || 0,
            g: Math.floor(Math.random() * 256) || 0,
            b: Math.floor(Math.random() * 256) || 0
        }

        await connectMongoDB();
        const tour = await Tour.create({
            name,
            duration,
            budget,
            expenses,
            background
        });

        return Response.json(
            {
                status: 200,
                statusText: 'Tour creation succesful',
                createdTour: tour
            }
        );

    } catch (e) {
        console.log(e);
        return Response.json(
            {
                status: 400,
                statusText: 'There was an error creating the tour',
                createdTour: null
            }
        );
    }
}