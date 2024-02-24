import bcrypt from 'bcryptjs';

const checkAuthorization = async () => {
    return (
        await bcrypt.compare(process.env.NEXT_PUBLIC_ADMIN_PIN || '', (localStorage.getItem('encrypted_pin') || 'encrypted_pin'))
    );
}

export default checkAuthorization;