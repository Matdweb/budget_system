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
    Button
} from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react';

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

    const [questions, setQuestions] = useState<question[]>([
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
    ]);

    const [currentQuestion, setCurrentQuestion] = useState<question>(questions[0]);
    const input = useRef<null | HTMLInputElement>(null);

    const [tour, setTour] = useState<Tour>(
        {
            id: 0,
            name: '',
            duration: 0,
            budget: []
        }
    );

    const handleNext = () => {
        const property = currentQuestion.property;
        const inputValue = input.current && input.current.value || '';

        if (property === 'budget') {
            setTour({
                ...tour,
                budget: [...tour.budget, parseInt(inputValue)]
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
            const budgetQuestions = [];
            for (let i = 0; i < parseInt(inputValue); i++) {
                budgetQuestions.push(
                    {
                        id: i + 2,
                        header: 'Ingrese el presupuesto del dia ' + (i + 1),
                        placeholder: 'presupuesto ' + (i + 1),
                        property: 'budget'
                    }
                );
            }
            setQuestions([...questions, ...budgetQuestions])
        }
    }

    useEffect(() => {
        console.log(tour);
        console.log(questions);
    }, [tour])

    useEffect(() => {
        if (input.current) {
            const nextQuestion = currentQuestion.id + 1;
            if (nextQuestion >= questions.length) {
                onClose();
            } else {
                setCurrentQuestion(questions[currentQuestion.id + 1])
            }
        }

    }, [tour, questions])

    return (
        <>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{currentQuestion.header}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Input placeholder={currentQuestion.placeholder} size='lg' colorScheme="orange" ref={input} />
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3}>Atras</Button>
                        <Button onClick={handleNext} colorScheme='orange'>
                            Siguiente
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddNewTourQuestionnaire