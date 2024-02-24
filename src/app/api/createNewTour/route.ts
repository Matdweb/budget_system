import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import Tour from "@/models/tourSchema";

export async function POST(request: Request) {

    try {
        const { newTour } = await request.json();

        await connectMongoDB();
        await Tour.create(newTour)

        return Response.json(
            {
                status: 200,
                statusText: 'Tour creation succesful'
            }
        );

    } catch (e) {
        console.log(e);
        return Response.json(
            {
                status: 400,
                statusText: 'There was an error creating the tour'
            }
        );
    }
}