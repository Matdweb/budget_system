'use client'
import AmerikVentureHeader from "@/components/AmerikVentureHeader";
import TourBox from "@/components/TourBox";
import AddNewTourFooter from "@/components/AddNewTourFooter";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5 pb-32">
      <AmerikVentureHeader />
      <TourBox />
      <TourBox />
      <TourBox />
      <AddNewTourFooter />
    </main >
  );
}
