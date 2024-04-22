import {
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box
} from '@chakra-ui/react';
import { QuestionOutlineIcon } from '@chakra-ui/icons'

interface Props {
    totalBudget: number,
    totalExpenses: number
}

function BudgetTable({ totalBudget, totalExpenses }: Props) {
    //boolean: if budget was exceded or not
    const budgetExceded = totalBudget < totalExpenses;

    const BudgetAndExpensesDifference = () => {
        if (budgetExceded) {
            return totalExpenses - totalBudget;
        } else {
            return totalBudget - totalExpenses;
        }
    }

    const difference = BudgetAndExpensesDifference().toFixed(2);

    return (
        <>
            <TableContainer className='mt-8 w-full'>
                <Table size='lg'>
                    <Tbody>
                        <Tr />
                        <Tr>
                            <Td>Presupuesto Total: </Td>
                            <Td isNumeric>${totalBudget}</Td>
                        </Tr>
                        <Tr>
                            <Td>Gastos Totales: </Td>
                            <Td isNumeric>${totalExpenses}</Td>
                        </Tr>
                        <Tr className={`${budgetExceded ? 'text-[red]' : 'text-[green]'}`}>
                            <Td>{budgetExceded ? 'Saldo que me deben: ' : 'Saldo ya pago: '}</Td>
                            <Td isNumeric>${difference}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Accordion allowToggle className='w-full'>
                <AccordionItem className='py-2'>
                    <h2>
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left'>
                                <QuestionOutlineIcon className='mr-2' />
                                Que significa {budgetExceded ? '"saldo que me deben" ' : '"saldo ya pago" '} ?
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        {budgetExceded ?
                            `Este monto representa que el presupuesto no ha alcanzado y la empresa Amerik Venture le tiene que pagar $${difference} + valor de la gira` :
                            `Este monto representa que el presupuesto si ha alcanazado y del pago completo por esta gira ya estarían pagos $${difference}`}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </>
    )
}

export default BudgetTable