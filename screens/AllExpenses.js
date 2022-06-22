import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../store/expenses-context';

const AllExpenses = () => {
    const expensesCtx = useContext(ExpenseContext);

    return (
        <ExpensesOutput
            expensesPeriod='Total'
            expenses={expensesCtx.expenses}
            fallbackText='No registered expenses found'
        />
    );
};

export default AllExpenses;
