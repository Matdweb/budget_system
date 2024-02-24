'use client'
import { useEffect } from "react";
import AmerikVentureHeader from "@/components/AmerikVentureHeader";
import PinInputWrapper from "@/components/PinInputWrapper";
import { useRouter } from "next/navigation";
import checkAuthorization from "@/lib/auth/checkAutorization";

function Page() {

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const authorized = await checkAuthorization();
      if (authorized) {
        router.push('/');
      }
    }

    checkAuth();
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5">
      <AmerikVentureHeader className='mb-40' />
      <PinInputWrapper />
    </main >
  )
}

export default Page