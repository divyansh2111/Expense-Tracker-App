import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpenseContext } from "../store/expenseContext";
import { dateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const ExpenseCtx = useContext(ExpenseContext);

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
