'use client'
import { useEffect } from "react";
import bcrypt from 'bcryptjs';
import { useRouter } from "next/navigation";

function AuthorizationProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    useEffect(() => {
        const checkAuthorization = async () => {
            if (!(await bcrypt.compare(process.env.NEXT_PUBLIC_ADMIN_PIN || '', (localStorage.getItem('encrypted_pin') || 'encrypted_pin')))) {
                router.push('/locked');
            } else {
                router.push('/');
            }
        }

        checkAuthorization();

    }, [])

    return (
        <div>{children}</div>
    )
}

export default AuthorizationProvider