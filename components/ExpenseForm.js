import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import Button from "./Button";
import { getFormattedDate } from "../utils/date";
import { GlobalStyles } from "../constants/styles";

const ExpenseForm = ({ onCancel, onSubmit, submitLabel, currentInput }) => {
  const [inputValues, setInputValues] = useState({
    date: {
      value: currentInput ? getFormattedDate(currentInput.date) : "",
      isValid: true,
    },
    amount: {
      value: currentInput ? currentInput.amount.toString() : "",
      isValid: true,
    },
    description: {
      value: currentInput ? currentInput.description : "",
      isValid: true,
    },
  });

  const onChangeHandler = (type, value) => {
    return setInputValues((prevValues) => {
      return {
        ...prevValues,
        [type]: { value: value, isValid: true },
      };
    });
  };

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputValues((prevValues) => {
        return {
          amount: { value: prevValues.amount.value, isValid: amountIsValid },
          date: { value: prevValues.date.value, isValid: dateIsValid },
          description: {
            value: prevValues.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputContainer}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "number-pad",
            onChangeText: onChangeHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
          style={styles.row}
          inValid={!inputValues.amount.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: onChangeHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
          style={styles.row}
          inValid={!inputValues.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: onChangeHandler.bind(this, "description"),
          value: inputValues.description.value,
        }}
        inValid={!inputValues.description.isValid}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>
          Invalid Input Values! Please rectify and try again.
        </Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="flat" style={styles.button} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
  },
  form: {
    marginTop: 24,
  },
  row: {
    flex: 1,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    margin: 8,
    color: GlobalStyles.colors.error500,
    textAlign: "center",
  },
});
