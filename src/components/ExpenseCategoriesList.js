import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ExpenseCategoryService from "../services/ExpenseCategoryService";
const ExpenseCategoriesList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    ExpenseCategoryService.getAll()
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
      <h5>
        ExpenseCategoriesList
        <Link to="/addcategory" className="float-right small">
          + New Category
        </Link>
      </h5>
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
