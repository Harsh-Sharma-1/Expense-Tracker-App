import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { ExpenseContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';
import { fetchExpenses } from '../util/http';

const RecentExpenses = () => {
    const expensesCtx = useContext(ExpenseContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function getExpenses() {
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />;
    }

    if (isFetching) {
        return <LoadingOverlay />;
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date > date7DaysAgo && expense.date <= today;
    });

    return (
        <ExpensesOutput
            expensesPeriod='Last 7 days'
            expenses={recentExpenses}
            fallbackText='No Expenses Registered for the last 7 days'
        />
    );
};

export default RecentExpenses;
