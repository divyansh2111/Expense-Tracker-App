import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenseContext";
import ExpenseForm from "../components/ExpenseForm";

const ManageExpenses = ({ route, navigation }) => {
  const expenseId = route.params?.id;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "New Expense",
    });
  }, [navigation, isEditing]);

  const ExpenseCtx = useContext(ExpenseContext);

  const deleteHandler = () => {
    ExpenseCtx.deleteExpense(expenseId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const submitHandler = (expenseData) => {
    if (isEditing) {
      ExpenseCtx.updateExpense(expenseId, expenseData);
    } else {
      ExpenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  };

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
