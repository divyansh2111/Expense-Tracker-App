import { useContext, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenseContext";
import ExpenseForm from "../components/ExpenseForm";
import { addExpense, deleteExpense, updateExpense } from "../utils/http";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";

const ManageExpenses = ({ route, navigation }) => {
  const expenseId = route.params?.id;
  const isEditing = !!expenseId;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "New Expense",
    });
  }, [navigation, isEditing]);

  const ExpenseCtx = useContext(ExpenseContext);

  const deleteHandler = async () => {
    try {
      setIsLoading(true);
      await deleteExpense(expenseId);
      ExpenseCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense. Please try again later");
      setIsLoading(false);
    }
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const submitHandler = async (expenseData) => {
    try {
      setIsLoading(true);
      if (isEditing) {
        await updateExpense(expenseId, expenseData);
        ExpenseCtx.updateExpense(expenseId, expenseData);
      } else {
        const id = await addExpense(expenseData);
        ExpenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not submit request. Please try again later.");
      setIsLoading(false);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  if (!isLoading && error) {
    return <ErrorScreen message={error} onConfirm={errorHandler} />;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  const selectedExpense = ExpenseCtx.expenses.filter(
    (expense) => expense.id === expenseId
  )[0];

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={submitHandler}
        currentInput={selectedExpense}
      />

      <View style={styles.deleteContainer}>
        {isEditing && (
          <Ionicons
            name="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteHandler}
          />
        )}
      </View>
    </View>
  );
};

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
