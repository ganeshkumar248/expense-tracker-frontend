import { useEffect, useState } from "react";
// import Moment from "react-moment";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import ExpenseService from "../services/ExpenseService";
import Piechart from "./Piechart";

const ExpensesList = () => {
  const [expenses, setExpenses] = useState([]);
  var currencyFormatter = require("currency-formatter");

  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    ExpenseService.getAll(currentUser.id)
      .then((response) => {
        console.log("expenses", response.data);
        setExpenses(response.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

  return (
    <div className="main-content">
      <Piechart />
      <hr />
      <h4>
        List of Expenses
        <Link to="/addexpense" className="float-right small">
          + New Expense
        </Link>
      </h4>
      <div className="notes-list mt-4">
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <div key={expense.id} className="notes-preview mt-3">
              <Link to={`/expensedetails/${expense.id}`}>
                <h5 className="primary-color">
                  {expense.expenseName}
                  <span>
                    <p className="text-italic small float-right">
                      {currencyFormatter.format(expense.amount, {
                        locale: "IN",
                      })}
                    </p>
                  </span>
                </h5>
                {/* <h5>
                  <span className="small">{expense.category}</span>
                  <span>
                    <Moment fromNow className="text-italic small float-right">
                      {expense.createdAt}
                    </Moment>
                  </span>
                </h5> */}
              </Link>
            </div>
          ))
        ) : (
          <div>No expenses available</div>
        )}
      </div>
    </div>
  );
};

export default ExpensesList;
