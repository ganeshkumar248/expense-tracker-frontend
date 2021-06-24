import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import ExpenseCategoryService from "../services/ExpenseCategoryService";
const ExpenseCategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const currentUser = AuthService.getCurrentUser();

  useEffect(() => {
    ExpenseCategoryService.getAll(currentUser.id)
      .then((response) => {
        console.log("expense categories", response.data);
        setCategories(response.data);
      })
      .catch((error) => {
        console.log("something went wrong", error);
      });
  }, []);

  return (
    <div className="main-content">
      <h4>
        List of Categories
        <Link to="/addcategory" className="float-right small">
          + New Category
        </Link>
      </h4>
      <div className="notes-list mt-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="notes-preview mt-3">
              <Link to={`/expensecategorydetails/${category.id}`}>
                <h5 className="primary-color">{category.categoryName}</h5>
              </Link>
            </div>
          ))
        ) : (
          <div>No expense-categories available</div>
        )}
      </div>
    </div>
  );
};

export default ExpenseCategoriesList;
