import { Spinner } from "@chakra-ui/react";

function LoadingSpinner() {
    return (
        <section className='w-full flex justify-center items-center py-8'>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='#cc6601'
                size='xl'
            />
        </section>
    )
}

export default LoadingSpinner