import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router";
import ExpenseCategoryService from "../services/ExpenseCategoryService";
import ExpenseService from "../services/ExpenseService";

const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState(false);
  const history = useHistory();
  const { id } = useParams();

  const saveCategory = (e) => {
    e.preventDefault();
    if (!categoryName) {
      setErrors(true);
      return;
    }
    const newCategory = { categoryName, description, id };
    if (id) {
      //call the service update method
      ExpenseCategoryService.update(newCategory)
        .then((response) => {
          console.log("Expense Category updated successfully", response.data);
          history.push("/expensecategories");
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    } else {
      //call the service create method
      ExpenseCategoryService.create(newCategory)
        .then((response) => {
          console.log("Expense Category added successfully", response.data);
          history.push("/expensecategories");
        })
        .catch((error) => {
          console.log("something went wroing", error);
        });
    }
  };

  useEffect(() => {
    if (id) {
      ExpenseCategoryService.get(id)
        .then((category) => {
          setCategoryName(category.data.categoryName);
          setDescription(category.data.description);
        })
        .catch((error) => {
          console.log("Something went wrong", error);
        });
    }
  }, []);

  return (
    <div className="create">
      <div className="text-center">
        <h5>{id ? "Update a Category" : "Add a New Category"}</h5>
        {errors && (
          <span style={{ color: "red", fontStyle: "italic" }}>
            Please enter the mandatory fields
          </span>
        )}
      </div>
      <form>
        <div className="form-group">
          <label htmlFor="category">
            Name<sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
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
          <button onClick={(e) => saveCategory(e)}>
            {id ? "Update Category" : "Add Category"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
