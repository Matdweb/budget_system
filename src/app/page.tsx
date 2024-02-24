'use client'
import AmerikVentureHeader from "@/components/AmerikVentureHeader";
import TourBox from "@/components/TourBox";
import AddNewTourFooter from "@/components/AddNewTourFooter";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchTours } from "@/redux/features/toursSlice";
import { Heading } from "@chakra-ui/react";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function Home() {
  const dispatch = useAppDispatch();
  const tours = useAppSelector(state => state.toursReducer.tours);
  const isLoading = useAppSelector(state => state.toursReducer.isLoading);

  useEffect(() => {
    dispatch(fetchTours());
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5 pb-32">
      <AmerikVentureHeader />
      {tours.map((tour) => {
        return (
          <TourBox
            key={tour._id}
            id={tour._id}
            name={tour.name}
            background={tour.background}
          />
        )
      })}
      {tours.length === 0 && !isLoading ?
        <div className='w-full flex justify-center items-center pt-8 opacity-45'>
          <Heading as='h3' size='lg'>
            No hay giras creadas
          </Heading>
        </div>
        :
        ''
      }

      {isLoading &&
        <LoadingSpinner />
      }
      <AddNewTourFooter />
    </main >
  );
}
