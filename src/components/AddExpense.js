import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router";
import ExpenseService from "../services/ExpenseService";

const AddExpense = () => {
  const [expenseName, setExpenseName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Home");
  const [date, setDate] = useState(new Date());
  const [errors, setErrors] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const saveNote = (e) => {
    e.preventDefault();
    if (!expenseName || !date || !amount || !category) {
      setErrors(true);
      return;
    }
    const newExpense = { expenseName, category, date, amount, description, id };
    if (id) {
      //call the service update method
      ExpenseService.update(newExpense)
        .then((response) => {
          console.log("Expense updated successfully", response.data);
          history.push("/");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      //call the service create method
      ExpenseService.create(newExpense)
        .then((response) => {
          console.log("Expense added successfully", response.data);
          history.push("/");
        })
        .catch((error) => {
          console.log("something went wroing", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      ExpenseService.get(id)
        .then((expense) => {
          setExpenseName(expense.data.expenseName);
          setDescription(expense.data.description);
          setAmount(expense.data.amount);
          setCategory(expense.data.category);
          setDate(new Date(expense.data.date));
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);

  return (
    <div className="create">
      <div className="text-center">
        <h5>{id ? "Update a Expense" : "Add a New Expense"}</h5>
        {errors && (
          <span style={{ color: "red", fontStyle: "italic" }}>
            Please enter the mandatory fields
          </span>
        )}
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="expense">
            Name<sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control"
            id="expenseName"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">
            Date<sup>*</sup>
          </label>
          <div>
            <DatePicker
              id="date"
              selected={date}
              value={date}
              filterDate={(d) => {
                return new Date() > d;
              }}
              onChange={(date) => setDate(date)}
              showTimeSelect
              timeFormat="hh:mm"
              timeIntervals={5}
              timeCaption="time"
              dateFormat="dd/MM/yyyy h:mm aa"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="category">
            Category<sup>*</sup>
          </label>
          <select
            id="category"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Home">Home</option>
            <option value="Food">Food</option>
            <option value="Bills">Bills</option>
            <option value="Shopping">Shopping</option>
            <option value="Health">Health</option>
            <option value="Transpotation">Transpotation</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">
            Amount<sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="text-center">
          <button onClick={(e) => saveNote(e)}>
            {id ? "Update Expense" : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;
