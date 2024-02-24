import { Heading } from "@chakra-ui/react";
import 'animate.css';
import { useRouter } from "next/navigation";

interface Props {
    id: string,
    name: string,
    background: {
        r: number,
        g: number,
        b: number
    }
};

function TourBox({ id, name, background }: Props) {

    const router = useRouter();

    const handleRedirect = () => {
        router.push('/tour/' + id);
    }

    return (
        <article className='w-full animate__animated animate__slideInLeft' onClick={handleRedirect}>
            <div
                className='min-w-64 w-full h-28 mt-12 flex justify-between items-center flex-row rounded-lg active:scale-95 transition-all duration-75 cursor-pointer select-none group'
                style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
            >
                <Heading as='h3' size='2xl' className='pl-4'>
                    {name}
                </Heading>
                <div
                    className='w-16 h-full group-hover:w-12 rounded-r-lg transition-all duration-700 ease-out'
                    style={{ background: `rgb(${background.r}, ${background.g}, ${background.b})` }}
                ></div>
            </div>
        </article>
    )
}

export default TourBox