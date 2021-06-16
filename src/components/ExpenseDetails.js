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
          <hr />
          <h5 className="text-primary">
            <strong>
              <span className="text-primary">Expense Name: </span>
            </strong>
            <span className="text-danger">{currentExpense.expenseName}</span>
          </h5>
          <p>
            <strong>
              <span className="text-primary">Amount: </span>
            </strong>
            <span className="text-danger">
              {currencyFormatter.format(currentExpense.amount, {
                locale: "IN",
              })}
            </span>
          </p>
          <p>
            <strong>
              <span className="text-primary">Category: </span>
            </strong>
            <span className="text-danger">{currentExpense.category}</span>
          </p>
          <p>
            <strong>
              <span className="text-primary">Description: </span>
            </strong>
            <span className="text-danger">{currentExpense.description}</span>
          </p>
          <p>
            <strong>
              <span className="text-primary">Actual Date: </span>
            </strong>
            <span className="text-danger">
              {moment(currentExpense.date).local().format("YYYY-MM-DD hh:mm A")}
            </span>
          </p>
          <p>
            <strong>
              <span className="text-primary">Created Date: </span>
            </strong>
            <span className="text-danger">
              {moment(currentExpense.createdAt)
                .local()
                .format("YYYY-MM-DD hh:mm A")}
            </span>
          </p>
          <p>
            <strong>
              <span className="text-primary">Last Updated Date: </span>
            </strong>
            <span className="text-danger">
              {moment(currentExpense.updatedAt)
                .local()
                .format("YYYY-MM-DD hh:mm A")}
            </span>
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
