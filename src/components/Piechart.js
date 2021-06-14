import { useEffect, useState } from "react";
import ExpenseService from "../services/ExpenseService";

const Piechart = () => {
  var currencyFormatter = require("currency-formatter");
  const [expenses, setExpenses] = useState([]);
  const totalExpense = () => {
    return expenses.reduce((amount, expense) => amount + expense.amount, 0);
  };

  useEffect(() => {
    ExpenseService.getAll()
      .then((response) => {
        console.log("printing resposne", response.data);
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

  return (
    <div className="budget">
      <div className=" col col-md col-sm">
        <h5>budget</h5>
        <p class="amount">
          $ <span id="budgetAmount">0</span>
        </p>
      </div>
      <div>
        <h5>expenses</h5>
        <p>
          {" "}
          {currencyFormatter.format(totalExpense(), {
            locale: "IN",
          })}
        </p>
      </div>
      <div>
        <h5>balance</h5>
        <p class="amount">
          $ <span id="budgetAmount">0</span>
        </p>
      </div>
    </div>
  );
};

export default Piechart;
