import AmerikVentureHeader from "@/components/AmerikVentureHeader";
import PinInputWrapper from "@/components/PinInputWrapper";

function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5">
      <AmerikVentureHeader className='mb-40' />
      <PinInputWrapper />
    </main >
  )
}

export default Page