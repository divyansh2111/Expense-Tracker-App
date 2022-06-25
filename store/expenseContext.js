import { createContext, useReducer } from "react";

export const ExpenseContext = createContext({
  expenses: [],
  setExpense: (expenses) => {},
  addExpense: ({ amount, description, date }) => {},
  updateExpense: (id, { amount, description, date }) => {},
  deleteExpense: ({ id }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "SET":
      return action.payload.reverse();
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedExpense = {
        id: updateableExpense.id,
        ...action.payload.data,
      };
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedExpense;
      // console.log(updatedExpenses);
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpenseContextProvider({ children }) {
  const [expenseState, dispatch] = useReducer(expenseReducer, []);

  function setExpense(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  const value = {
    expenses: expenseState,
    setExpense: setExpense,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
