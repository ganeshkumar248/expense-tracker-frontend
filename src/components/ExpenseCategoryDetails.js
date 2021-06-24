import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useParams } from "react-router";
import ExpenseCategoryService from "../services/ExpenseCategoryService";

const ExpenseCategoryDetails = () => {
  const { id } = useParams();
  const [currentExpenseCategory, setCurrentExpenseCategory] = useState("");
  const history = useHistory();

  useEffect(() => {
    ExpenseCategoryService.get(id)
      .then((category) => {
        setCurrentExpenseCategory(category.data);
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  }, []);

  const handleDelete = () => {
    ExpenseCategoryService.remove(id)
      .then((response) => {
        console.log("Category deleted successfully", response.data);
        history.push("/expensecategories");
      })
      .catch((error) => {
        console.log("Something went wrong", error);
      });
  };

  const handleEdit = () => {
    history.push(`/expensecategorydetails/edit/${id}`);
  };

  return (
    <div className="note-details main-content">
      {currentExpenseCategory && (
        <div>
          <h3>Expense Category Details</h3>
          <hr />

          <h5 className="text-primary">
            <strong>
              <span className="text-primary">Expense Category Name: </span>
            </strong>
            <span className="text-danger">
              {currentExpenseCategory.categoryName}
            </span>
          </h5>
          <p>
            <strong>
              <span className="text-primary">Description: </span>
            </strong>
            <span className="text-danger">
              {currentExpenseCategory.description}
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

export default ExpenseCategoryDetails;
