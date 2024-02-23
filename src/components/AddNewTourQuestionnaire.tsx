'use client'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    useToast
} from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react';
import 'animate.css'

interface Props {
    isOpen: boolean,
    onClose: () => void
}

type question = {
    id: number,
    header: string,
    placeholder: string,
    property: string
}

type Tour = {
    id: number,
    name: string,
    duration: number,
    budget: number[]
}

function AddNewTourQuestionnaire({ isOpen, onClose }: Props) {

    const questionsInitialState = [
        {
            id: 0,
            header: 'Ingrese el nombre de la gira',
            placeholder: 'Nombre gira',
            property: 'name'
        },
        {
            id: 1,
            header: 'Ingrese cuantos días dura la gira',
            placeholder: 'Días gira',
            property: 'duration'
        }
    ];
    const [questions, setQuestions] = useState<question[]>(questionsInitialState);
    const [currentQuestion, setCurrentQuestion] = useState<question>(questions[0]);
    const [tour, setTour] = useState<Tour>(
        {
            id: 0,
            name: '',
            duration: 0,
            budget: []
        }
    );
    const input = useRef<null | HTMLInputElement>(null);

    const [animationClass, setAnimationClass] = useState<string>('');
    const toast = useToast();

    const handleNext = () => {
        const property = currentQuestion.property;
        const inputValue = input.current && input.current.value || '';

        if (inputValue) {
            handleNextAnimation();
        } else {
            handleErrorAnimation();
            handleInputError();
            return;
        }

        if (property === 'budget') {
            const budget = tour.budget;
            budget[currentQuestion.id - 2] = parseInt(inputValue);
            setTour({
                ...tour,
                budget
            });
        } else {
            setTour({
                ...tour,
                [property]: inputValue
            });
        }
        //resets value
        input.current ? input.current.value = '' : '';

        //will ask for the budget based on quantity of days
        if (currentQuestion.id === 1) {
            addBudgetQuestions(parseInt(inputValue));
        }
    }

    const handleBack = () => {
        if (currentQuestion.id === 0) {
            handleErrorAnimation();
        } else {
            handleBackAnimation();
            //resets value
            input.current ? input.current.value = '' : '';
            setCurrentQuestion((prev) => {
                return questions[prev.id - 1]
            });
        }
    }

    const handleInputError = () => {
        const currentInput = input.current;
        if (currentInput) {
            currentInput.style.outline = '2px solid red';
            currentInput.onfocus = () => {
                currentInput.style.outline = '';
            }
        }
    }

    const handleNextAnimation = () => {
        setAnimationClass('animate__backOutLeft');
        setTimeout(() => {
            setAnimationClass('animate__backInRight')
        }, 400);
    }

    const handleBackAnimation = () => {
        setAnimationClass('animate__backOutRight');
        setTimeout(() => {
            setAnimationClass('animate__backInLeft')
        }, 400);
    }

    const handleErrorAnimation = () => {
        setAnimationClass('animate__headShake')
        setTimeout(() => {
            setAnimationClass('')
        }, 1000);
    }

    const addBudgetQuestions = (numberOfDays: number) => {
        const budgetQuestions = [];
        for (let i = 0; i < numberOfDays; i++) {
            budgetQuestions.push(
                {
                    id: i + 2,
                    header: 'Ingrese el presupuesto del día ' + (i + 1),
                    placeholder: 'Presupuesto ' + (i + 1),
                    property: 'budget'
                }
            );
        }

        const lastElementId = budgetQuestions[budgetQuestions.length - 1].id || 0;

        budgetQuestions.push(
            {
                id: lastElementId + 1,
                header: 'Ingrese el presupuesto de gastos inesperados (unforseen expenses)',
                placeholder: 'Presupuesto extra',
                property: 'budget'
            }
        )
        setQuestions([...questionsInitialState, ...budgetQuestions]);
        setTour({
            ...tour,
            duration: numberOfDays,
            budget: []
        });
    }

    const handleClose = () => {
        onClose();
        handleToast()

        setCurrentQuestion(questions[0]);
        setQuestions(questionsInitialState);
        setTour({
            id: 0,
            name: '',
            duration: 0,
            budget: []
        });

    }

    const handleToast = () => {
        if (currentQuestion.id === questions[questions.length - 1].id) {
            toast({
                title: 'Nueva gira registrada.',
                description: "La gira " + tour.name + " ha sido creada",
                variant: 'subtle',
                status: 'success',
                duration: 4000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Hubo un error al crear la gira.',
                description: "Lo sentimos, no se pudo registrar la gira",
                variant: 'subtle',
                status: 'error',
                duration: 4000,
                isClosable: true,
            });
        }
    }

    useEffect(() => {
        console.log(tour);
        console.log(questions);
    }, [tour]);

    useEffect(() => {
        if (tour.name) {
            const nextQuestion = currentQuestion.id + 1;
            if (nextQuestion >= questions.length) {
                handleClose();
            } else {
                setCurrentQuestion(questions[currentQuestion.id + 1])
            }
        }

    }, [tour, questions]);

    return (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <section className={`animate__animated ${animationClass}`}>
                    <ModalHeader>{currentQuestion.header}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <InputGroup>
                            {
                                currentQuestion.property === 'budget' &&
                                <InputLeftElement
                                    pointerEvents='none'
                                    height='100%'
                                    color='gray.300'
                                    fontSize='1.5em'
                                >
                                    $
                                </InputLeftElement>
                            }
                            <Input placeholder={currentQuestion.placeholder} size='lg' colorScheme="orange" ref={input} />
                        </InputGroup>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={handleBack} mr={3}>Atras</Button>
                        <Button onClick={handleNext} colorScheme='orange'>
                            Siguiente
                        </Button>
                    </ModalFooter>
                </section>
            </ModalContent>
        </Modal>
    )
}

export default AddNewTourQuestionnaire