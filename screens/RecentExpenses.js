import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import LoadingScreen from "./LoadingScreen";
import { ExpenseContext } from "../store/expenseContext";
import { dateMinusDays } from "../utils/date";
import { fetchExpences } from "../utils/http";
import ErrorScreen from "./ErrorScreen";

const RecentExpenses = () => {
  const ExpenseCtx = useContext(ExpenseContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const expenses = await fetchExpences();
        ExpenseCtx.setExpense(expenses);
      } catch (error) {
        setError("Could not load your Expenses. Please Refresh.");
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);

  const errorHandler = () => {
    setError(null);
  };

  if (!isLoading && error) {
    return <ErrorScreen message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const recentExpenses = ExpenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const dateAWeekAgo = dateMinusDays(today, 7);

    return expense.date >= dateAWeekAgo && expense.date <= today;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      periodName={"Last 7 Days"}
      fallbackText="No expenses in the last 7 days"
    />
  );
};

export default RecentExpenses;

const styles = StyleSheet.create({});
