import axios from "axios";

const BASE_URL =
  "https://expense-tracker-app-f1022-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function addExpense(expense) {
  const res = await axios.post(BASE_URL + "/expense.json", expense);
  return res.data.name;
}

export async function fetchExpences() {
  const res = await axios.get(BASE_URL + "/expense.json");

  const expenses = [];
  for (const key in res.data) {
    const expenseObj = {
      id: key,
      date: new Date(res.data[key].date),
      amount: res.data[key].amount,
      description: res.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}

export function updateExpense(id, expense) {
  return axios.put(BASE_URL + `/expense/${id}.json`, expense);
}

export function deleteExpense(id) {
  return axios.delete(BASE_URL + `/expense/${id}.json`);
}
