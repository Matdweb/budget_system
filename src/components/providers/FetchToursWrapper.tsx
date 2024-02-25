'use client'
import { useAppDispatch } from "@/redux/hooks";
import { fetchTours } from "@/redux/features/toursSlice";
import { useEffect } from "react";

function FetchToursWrapper({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTours());
    }, []);

    return (
        <>
            {children}
        </>
    )
}

export default FetchToursWrapper