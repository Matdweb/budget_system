'use client'
import { useAppSelector } from "@/redux/hooks";
import { Heading } from "@chakra-ui/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import 'animate.css'

function Page({ params }: { params: { tour_id: string } }) {
    const tours = useAppSelector(state => state.toursReducer.tours);
    const isLoading = useAppSelector(state => state.toursReducer.isLoading);

    const currentTour = tours.find((tour) => {
        return tour._id === params.tour_id;
    });

    const rgba = `${currentTour?.background.r},${currentTour?.background.g},${currentTour?.background.b},1`

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-5 pb-32">
            {
                !isLoading ?
                    <header
                        className='min-w-64 w-full py-10 px-4 text-black flex justify-center items-center flex-col flex-nowrap text-center rounded-lg animate__animated animate__backInDown'
                        style={{ boxShadow: `0px 0px 0px 2px rgba(${rgba}),-8px 8px 0px 0px rgba(${rgba})` }}>
                        <Heading as='h2' size='xl'>
                            {currentTour?.name || ''}
                        </Heading>
                    </header>
                    :
                    <LoadingSpinner />}
        </main>
    )
}

export default Page