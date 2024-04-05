import {
    Table,
    Tbody,
    Tr,
    Td,
    TableContainer,
} from '@chakra-ui/react';

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

    return (
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
                        <Td>{budgetExceded ? 'Saldo que le deben: ' : 'Saldo ya pago: '}</Td>
                        <Td isNumeric>${BudgetAndExpensesDifference()}</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default BudgetTable