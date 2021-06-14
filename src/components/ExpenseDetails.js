import { useEffect, useState } from "react";
import moment from "moment";
import { useHistory, useParams } from "react-router";
import ExpenseService from "../services/ExpenseService";

const ExpenseDetails = () => {
  const { id } = useParams();
  const [currentExpense, setCurrentExpense] = useState("");
  const history = useHistory();

  var currencyFormatter = require("currency-formatter");

  useEffect(() => {
    ExpenseService.get(id)
      .then((expense) => {
        setCurrentExpense(expense.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  }, []);

  const handleDelete = () => {
    ExpenseService.remove(id)
      .then((response) => {
        history.push("/");
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const handleEdit = () => {
    history.push(`/expenses/edit/${id}`);
  };

  return (
    <div className="note-details main-content">
      {currentExpense && (
        <div>
          <h3>Expense Details</h3>
          <h5 className="text-primary">
            <strong>
              <span className="text-primary">Expense Name: </span>
            </strong>
            {currentExpense.expenseName}
          </h5>
          <p>
            <strong>
              <span>Amount: </span>
            </strong>
            {currencyFormatter.format(currentExpense.amount, {
              locale: "IN",
            })}
          </p>
          <p>
            <strong>
              <span>Category: </span>
            </strong>
            {currentExpense.category}
          </p>
          <p>
            <strong>
              <span>Description: </span>
            </strong>
            {currentExpense.description}
          </p>
          <p>
            <strong>
              <span>Actual Date: </span>
            </strong>
            {moment(currentExpense.date).local().format("YYYY-MM-DD")}
          </p>
          <p>
            <strong>
              <span>Created Date: </span>
            </strong>
            {moment(currentExpense.createdAt).local().format("YYYY-MM-DD")}
          </p>
          <p>
            <strong>
              <span>Last Updated Date: </span>
            </strong>
            {moment(currentExpense.updatedAt).local().format("YYYY-MM-DD")}
          </p>

          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete} className="ml-3 bg-danger">
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseDetails;
