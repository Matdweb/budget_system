'use client'
import AmerikVentureHeader from "@/components/AmerikVentureHeader";
import { useEffect } from "react";
import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const checkAuthorization = async () => {
      if (!(await bcrypt.compare(process.env.NEXT_PUBLIC_ADMIN_PIN || '', (localStorage.getItem('encrypted_pin') || 'encrypted_pin')))) {
        router.push('/locked');
      }
    }

    checkAuthorization();

  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-5">
      <AmerikVentureHeader />
    </main >
  );
}
