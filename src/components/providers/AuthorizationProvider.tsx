'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import checkAuthorization from "@/lib/auth/checkAutorization";

function AuthorizationProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const checkAuth = async () => {
            const authorized = await checkAuthorization();
            if (!authorized) {
                router.push('/locked');
            }
        }

        checkAuth();
    }, [])

    return (
        <div>{children}</div>
    )
}

export default AuthorizationProvider