import { Heading } from '@chakra-ui/react'

function AmerikVentureHeader({ className }: { className?: string }) {
    return (
        <header
            className={`min-w-64 py-10 px-4 text-black flex justify-center items-center flex-col flex-nowrap text-center rounded-lg ${className}`}
            style={{ boxShadow: '0px 0px 0px 2px rgba(204,102,1,1),-8px 8px 0px 0px rgba(204,102,1,1)' }}>
            <Heading as='h2' size='xl'>
                Sistema de Presupuestos
            </Heading>
            <Heading as='h4' size='md' className='pt-8'>
                Amerik Venture
            </Heading>
        </header>
    )
}

export default AmerikVentureHeader