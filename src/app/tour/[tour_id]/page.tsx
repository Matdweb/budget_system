'use client'
import { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addExpenses } from "@/redux/features/toursSlice";
import { Heading, Text, useToast } from "@chakra-ui/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useRouter } from "next/navigation";
import BudgetTable from "@/components/BudgetTable";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    useDisclosure
} from '@chakra-ui/react'
import 'animate.css'

function Page({ params }: { params: { tour_id: string } }) {
    const tours = useAppSelector(state => state.toursReducer.tours);
    const isLoading = useAppSelector(state => state.toursReducer.isLoading);
    const [showAnalysis, setShowAnalysis] = useState<boolean>(false);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const input = useRef<null | HTMLInputElement>(null);
    const toast = useToast();

    const dispatch = useAppDispatch();

    const router = useRouter();

    const currentTour = tours.find((tour) => {
        return tour._id === params.tour_id;
    });

    const rgba = `rgba(${currentTour?.background.r},${currentTour?.background.g},${currentTour?.background.b},1)`;

    const handleGoBack = () => {
        router.push('/');
    }

    const handleRegisterNewExpenses = () => {
        if ((currentTour?.expenses.length || 0) <= (currentTour?.duration || 0)) {
            onOpen();
        } else {
            toast({
                title: 'Error al registrar gasto',
                description: "Ya no se pueden registrar mas gastos",
                status: 'error',
                duration: 7000,
                isClosable: true,
            })
        }
    }

    const registerNewExpenses = async () => {
        const value = input.current?.value;
        if (value) {
            const expenses = parseFloat(value || '0');
            const promise = dispatch(addExpenses({ tour_id: params.tour_id, expenses }));

            onClose();

            toast.promise(promise, {
                success: { title: 'Exito :)', description: '¡Nuevo gasto agregado!' },
                error: { title: 'Error :(', description: 'No se pudo agregar el gasto' },
                loading: { title: 'Un momento...', description: 'La paciencia es una virtud' },
            });
        } else {
            handleInputError();
        }
    }

    const handleInputError = () => {
        if (input.current) {
            const currentInput = input.current;
            currentInput.classList.add('animate__headShake');
            currentInput.style.outline = '2px solid red';
            setTimeout(() => {
                currentInput.classList.remove('animate__headShake');
                currentInput.onfocus = () => {
                    currentInput.style.outline = '';
                }
            }, 1000);
        }
    }

    const toggleShowAnalysis = () => {
        setShowAnalysis(!showAnalysis);
    }

    const sumTotalBudget = () => {
        return parseFloat(currentTour?.budget.reduce((accumalator, currentValue) => {
            return accumalator + currentValue;
        }, 0).toFixed(2) || '0');
    }

    const sumTotalExpenses = () => {
        return parseFloat(currentTour?.expenses.reduce((accumalator, currentValue) => {
            return accumalator + currentValue;
        }, 0).toFixed(2) || '0');
    }

    const menuOptions = [
        {
            id: 0,
            className: 'mr-3 shrink-0',
            text: '',
            icon: <ArrowBackIcon w={7} h={7} />,
            onclick: handleGoBack,
        },
        {
            id: 1,
            className: 'grow',
            text: 'Registrar nuevo día',
            icon: null,
            onclick: handleRegisterNewExpenses,
        },
        {
            id: 2,
            className: `mt-3 shrink-0 grow animate__animated ${showAnalysis ? `animate__flipInX` : ``}`,
            style: showAnalysis ? { background: rgba, color: '#fff' } : {},
            text: 'Mostrar analisis',
            icon: null,
            onclick: toggleShowAnalysis,
        },
    ]

    return (
        <main className="flex min-h-screen flex-col items-center justify-start p-5 pb-32">
            {
                !isLoading ?
                    <>
                        <header
                            className='min-w-64 w-full py-10 px-4 text-black flex justify-center items-center flex-col flex-nowrap text-center rounded-lg animate__animated animate__backInDown'
                            style={{ boxShadow: `0px 0px 0px 2px ${rgba},-8px 8px 0px 0px ${rgba}` }}>
                            <Heading as='h2' size='xl'>
                                {currentTour?.name || ''}
                            </Heading>
                        </header>
                        {/* Menu options */}
                        <section className='w-full mt-4 flex justify-start items-center flex-row flex-wrap animate__animated animate__slideInLeft'>
                            {menuOptions.map((option) => {
                                return (
                                    <button
                                        key={option.id}
                                        className={`p-4 flex justify-center items-center rounded-lg border-2 ${option.className}`}
                                        style={{ borderColor: rgba, ...option.style }}
                                        onClick={option.onclick}
                                    >
                                        {option.text &&
                                            <Text fontSize='lg'>{option.text}</Text>
                                        }
                                        {option.icon && option.icon}
                                    </button>
                                )
                            })}
                            {
                                currentTour?.budget.map((budget, i) => {
                                    const currentExpenses = currentTour.expenses[i];
                                    const exceded = budget < currentExpenses;
                                    const difference = ((exceded ? currentExpenses - budget : budget - currentExpenses) || 0).toFixed(2);
                                    return (
                                        <article className='w-full animate__animated animate__slideInLeft' key={i}>
                                            <div
                                                className='min-w-64 w-full h-32 mt-12 flex justify-center items-start rounded-lg active:scale-95 transition-all duration-75 cursor-pointer select-none group'
                                                style={{ boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px' }}
                                            >
                                                <div
                                                    className='w-3 h-full rounded-l-lg'
                                                    style={{ background: `${exceded ? 'red' : 'green'}` }}
                                                ></div>
                                                <div className='grow'>
                                                    <div className='w-full p-5 pt-3 pb-0'>
                                                        <Heading as='h4' size='xl'>
                                                            {i === currentTour.budget.length - 1 ? `Presupuesto Extra` : `Día ${i + 1}`}
                                                        </Heading>
                                                        <Text fontSize='lg'>Presupuesto: ${budget}</Text>
                                                        <Text fontSize='lg'>Gasto: ${currentExpenses || 0}</Text>
                                                    </div>
                                                    {
                                                        showAnalysis &&
                                                        <div className='w-full flex justify-end items-start'>
                                                            <span
                                                                className='relative bottom-7 right-2 w-44 px-3 py-2 flex justify-center items-center rounded-xl text-white outline outline-2 outline-white outline-offset-[-7px]'
                                                                style={{ background: `${exceded ? 'red' : 'green'}` }}
                                                            >
                                                                {exceded ? 'Excedente' : 'Sobrante'}: ${difference}
                                                            </span>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </article>
                                    )
                                })
                            }
                            {
                                showAnalysis &&
                                <BudgetTable
                                    totalBudget={sumTotalBudget()}
                                    totalExpenses={sumTotalExpenses()}
                                />
                            }
                        </section>
                        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Ingrese los gastos del día {(currentTour?.expenses.length || 0) + 1}</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody pb={6}>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents='none'
                                            height='100%'
                                            color='gray.300'
                                            fontSize='1.5em'
                                        >
                                            $
                                        </InputLeftElement>
                                        <Input
                                            className='animate__animated'
                                            placeholder={`Gastos ${(currentTour?.expenses.length || 0) + 1}`}
                                            size='lg'
                                            colorScheme="orange"
                                            ref={input}
                                        />
                                    </InputGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button onClick={onClose} mr={3}>Cancelar</Button>
                                    <Button colorScheme='orange' onClick={registerNewExpenses}>
                                        Registrar
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </>
                    :
                    <LoadingSpinner />
            }
        </main>
    )
}

export default Page