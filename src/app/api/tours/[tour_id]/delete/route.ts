import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import Tour from "@/models/tourSchema";

export async function GET(request: Request, { params }: { params: { tour_id: string } }) {
    try {
        const tour_id = params.tour_id;

        await connectMongoDB();
        const tour = await Tour.findOneAndDelete({ _id: tour_id });

        return Response.json(
            {
                status: 200,
                statusText: 'Tour deleted succesfully',
                deletedTour: tour
            }
        );

    } catch (e) {
        console.log(e);
        return Response.json(
            {
                status: 400,
                statusText: 'There was an error deleting the tour',
                deletedTour: null
            }
        );
    }
}