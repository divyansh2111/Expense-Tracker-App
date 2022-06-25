import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of Shoes",
    amount: 39.99,
    date: new Date("2022-05-14"),
  },
  {
    id: "e2",
    description: "Sunglasses",
    amount: 20.99,
    date: new Date("2022-05-24"),
  },
  {
    id: "e3",
    description: "A T-Shirt",
    amount: 30.11,
    date: new Date("2022-05-29"),
  },
  {
    id: "e4",
    description: "Tunday Kababi",
    amount: 20.15,
    date: new Date("2022-06-01"),
  },
  {
    id: "e5",
    description: "A Bagpack",
    amount: 15.99,
    date: new Date("2022-06-02"),
  },
  {
    id: "e6",
    description: "A pair of Shoes",
    amount: 39.99,
    date: new Date("2022-05-14"),
  },
  {
    id: "e7",
    description: "Sunglasses",
    amount: 20.99,
    date: new Date("2022-06-24"),
  },
  {
    id: "e8",
    description: "A T-Shirt",
    amount: 30.11,
    date: new Date("2022-05-29"),
  },
  {
    id: "e9",
    description: "Tunday Kababi",
    amount: 20.15,
    date: new Date("2022-06-22"),
  },
  {
    id: "e10",
    description: "A Bagpack",
    amount: 15.99,
    date: new Date("2022-06-20"),
  },
];

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ amount, description, date }) => {},
  updateExpense: (id, { amount, description, date }) => {},
  deleteExpense: ({ id }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ id: id, ...action.payload }, ...state];
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
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

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
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };

  return (
    <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
  );
}

export default ExpenseContextProvider;
