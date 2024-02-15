'use client'
import { useToast, HStack, PinInput, PinInputField } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import bcrypt from 'bcryptjs';
import { useRouter } from 'next/navigation';

function PinInputWrapper() {
    const [pin, setPin] = useState<string>('');
    const toast = useToast();
    const router = useRouter()

    const handlePinChange = (value: string) => {
        setPin(value);
    }

    const handleCompleted = async () => {
        if (pin === process.env.NEXT_PUBLIC_ADMIN_PIN) {
            console.log('access granted')
            const encrypted_pin = await bcrypt.hash(pin, 10);
            localStorage.setItem('encrypted_pin', encrypted_pin);
            router.push('/');
        } else {
            throw new Error('Pin is incorrect');
        }
    }

    useEffect(() => {
        if (pin.length > 3) {
            toast.promise(handleCompleted(), {
                success: { title: '¡Todo listo!', description: 'Acceso autorizado' },
                error: { title: 'Hubo un error :(', description: 'Pin incorrecto' },
                loading: { title: 'Analizando...', description: '¿Eres tu?' },
            })
        }

    }, [pin])

    return (
        <HStack>
            <PinInput
                size='lg'
                focusBorderColor='#cc6601'
                onChange={handlePinChange}
                mask
            >
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
            </PinInput>
        </HStack>
    )
}

export default PinInputWrapper