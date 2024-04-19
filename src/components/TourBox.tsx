import {
    Heading,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogCloseButton,
    AlertDialogBody,
    Button,
    AlertDialogFooter,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import 'animate.css';
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "@/redux/hooks";
import { deleteTour } from "@/redux/features/toursSlice";

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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const dispatch = useAppDispatch();
    const toast = useToast();

    const router = useRouter();

    const handleRedirect = () => {
        router.push('/tour/' + id);
    }

    const handleDeleteTour = async () => {
        const deleteAction = dispatch(deleteTour(id));
        toast.promise(deleteAction, {
            success: { title: 'Exito :)', description: '¡Gira eliminada con exito!' },
            error: { title: 'Error :(', description: 'No se pudo eliminar la gira' },
            loading: { title: 'Un momento...', description: 'La paciencia es una virtud' },
        });
    }

    return (
        <>
            <article className='w-full animate__animated animate__slideInLeft' onClick={handleRedirect}>
                <div
                    className='min-w-64 w-full h-28 mt-12 flex justify-between items-center flex-row rounded-lg active:scale-95 transition-all duration-75 cursor-pointer select-none group'
                    style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
                >
                    <Heading as='h3' size='2xl' className='pl-4'>
                        {name}
                    </Heading>
                    <div
                        className='w-16 h-full group-hover:w-12 rounded-r-lg transition-all duration-700 ease-out flex justify-center items-center'
                        ref={cancelRef}
                        style={{ background: `rgb(${background.r}, ${background.g}, ${background.b})` }}
                    >
                        <DeleteIcon
                            color='white'
                            boxSize={8}
                            className='opacity-0 group-hover:opacity-100 transition-all duration-700 ease-in-out'
                            onClick={(e) => {
                                e.stopPropagation();
                                onOpen();
                            }}
                        />
                    </div>
                </div>
            </article>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
                    <AlertDialogHeader>¿Eliminar esta gira?</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody>
                        {`Estas seguro que quieres eliminar la gira "${name}"`}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button onClick={onClose}>
                            No
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={handleDeleteTour}>
                            Sí
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog >
        </>
    )
}

export default TourBox