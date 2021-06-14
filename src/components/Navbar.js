import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseService from "../services/ExpenseService";

const Navbar = () => {
  const [expenses, setExpenses] = useState([]);
  var currencyFormatter = require("currency-formatter");

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
    <nav className="navbar">
      <h2 className="primary-color">Expense Manager</h2>
      {/* <div>
        <p>
          Total Expense:{" "}
          {currencyFormatter.format(totalExpense(), {
            locale: "IN",
          })}
        </p>
      </div> */}
    </nav>
  );
};

export default Navbar;
