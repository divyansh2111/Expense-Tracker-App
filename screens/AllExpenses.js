import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpenseContext } from "../store/expenseContext";

const AllExpenses = () => {
  const ExpenseCtx = useContext(ExpenseContext);

  return (
    <ExpensesOutput
      expenses={ExpenseCtx.expenses}
      periodName={"Total"}
      fallbackText="No registered expenses found"
    />
  );
};

export default AllExpenses;

const styles = StyleSheet.create({});
