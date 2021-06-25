import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import ExpenseService from "../services/ExpenseService";

const Piechart = () => {
  var currencyFormatter = require("currency-formatter");
  const [expenses, setExpenses] = useState([]);
  const totalExpense = () => {
    return expenses.reduce((amount, expense) => amount + expense.amount, 0);
  };

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      sumOfTotalExpense(user.id);
    }
  }, []);

  const sumOfTotalExpense = (id) => {
    ExpenseService.getAll(id)
      .then((response) => {
        console.log("expenses", response.data);
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  };

  return (
    <div className="budget">
      <div>
        <h5>Budget</h5>
        <p class="amount">
          ₹ <span id="budgetAmount">0</span>
        </p>
      </div>
      <div>
        <h5>Expenses</h5>
        <p>
          {" "}
          {currencyFormatter.format(totalExpense(), {
            locale: "IN",
          })}
        </p>
      </div>
      <div>
        <h5>Balance</h5>
        <p>
          ₹ <span id="budgetAmount">0</span>
        </p>
      </div>
    </div>
  );
};

export default Piechart;
