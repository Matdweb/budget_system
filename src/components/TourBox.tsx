'use client'
import { useEffect, useState } from "react";
import { Heading } from "@chakra-ui/react";

type randomRGB = {
    r: number,
    g: number,
    b: number
}

function TourBox() {

    const [randomRGB, setRandomRGB] = useState<randomRGB>({ r: 0, g: 0, b: 0 });

    const createRandomRGB = () => {
        setRandomRGB(
            {
                r: Math.floor(Math.random() * 256) || 0,
                g: Math.floor(Math.random() * 256) || 0,
                b: Math.floor(Math.random() * 256) || 0
            })
    }

    useEffect(() => {
        createRandomRGB();
    }, [])

    return (
        <div
            className='min-w-64 w-full h-28 mt-12 flex justify-between items-center flex-row rounded-lg active:scale-95 transition-all duration-75 cursor-pointer select-none group'
            style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
        >
            <Heading as='h3' size='2xl' className='pl-4'>
                Gira 1
            </Heading>
            <div
                className='w-16 h-full group-hover:w-12 rounded-r-lg transition-all duration-700 ease-out'
                style={{ background: `rgb(${randomRGB.r}, ${randomRGB.g}, ${randomRGB.b})` }}
            ></div>
        </div>
    )
}

export default TourBox