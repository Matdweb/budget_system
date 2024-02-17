'use client'
import AmerikVentureHeader from "@/components/AmerikVentureHeader";
import TourBox from "@/components/TourBox";
import { Heading, Text } from "@chakra-ui/react";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5 pb-32">
      <AmerikVentureHeader />
      <TourBox />
      <TourBox />
      <TourBox />
      <footer className='bg-[#959595] fixed bottom-0 w-full h-28 flex justify-center items-center'>
        <Text
          fontSize='2xl'
          className='outline outline-2 px-4 py-2 outline-[#5d5d5d] rounded-md active:scale-95 transition-all duration-75 cursor-pointer'
        >
          + Añadir gira
        </Text>
      </footer>
    </main >
  );
}
