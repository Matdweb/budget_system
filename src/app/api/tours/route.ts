import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import Tour from "@/models/tourSchema";

export async function GET() {
    try {
        await connectMongoDB();
        const tours = await Tour.find({});

        return Response.json(
            {
                status: 201,
                statusText: 'Tour creation succesful',
                tours
            }
        );

    } catch (e) {
        console.log(e);
        return Response.json(
            {
                status: 400,
                statusText: 'There was an error creating the tour',
                tours: []
            }
        );
    }
}