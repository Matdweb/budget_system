import { connectMongoDB } from "@/lib/mongoDB/mongodb";
import Tour from "@/models/tourSchema";

export async function POST(
    request: Request,
    { params }: { params: { tour_id: string } }
) {

    try {
        const tour_id = params.tour_id;
        const { expenses }: { expenses: number } = await request.json();

        await connectMongoDB();
        const tour = await Tour.findOne({ _id: tour_id });

        tour.expenses.push(expenses);

        await tour.save();

        return Response.json(
            {
                status: 200,
                statusText: 'Expenses added succesfully',
                editedTour: tour
            }
        );

    } catch (e) {
        console.log(e);
        return Response.json(
            {
                status: 400,
                statusText: 'There was an error adding expenses to the tour',
                editedTour: null
            }
        );
    }
}