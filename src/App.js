import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import AddCategory from "./components/AddCategory";
import AddExpense from "./components/AddExpense";
import ExpenseCategoriesList from "./components/ExpenseCategoriesList";
import ExpenseCategoryDetails from "./components/ExpenseCategoryDetails";
import { useEffect, useState } from "react";
import ExpenseDetails from "./components/ExpenseDetails";
import ExpensesList from "./components/ExpensesList";
import NotFound from "./components/NotFound";
// import Sidebar from "./components/Sidebar";
import AuthService from "./services/AuthService";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <div className="container mt-3">
        <BrowserRouter>
          <div>
            <div className="text-center">
              <h3 className="primary-color text-cenetr">Expense Tracker</h3>
            </div>

            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <div className="navbar-nav mr-auto">
                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/expenses"} className="nav-link">
                      Home
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/expensecategories"} className="nav-link">
                      Category
                    </Link>
                  </li>
                )}
              </div>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/login"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </nav>
            <div>
              <Switch>
                <Route exact path={("/", "/login")} component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path={"/expenses"} component={ExpensesList} />
                <Route path="/addexpense" component={AddExpense} />
                <Route path="/expenseupdate/:id" component={AddExpense} />
                <Route path="/expensedetails/:id" component={ExpenseDetails} />
                <Route path="/about" component={AboutPage} />
                <Route
                  path="/expensecategories"
                  component={ExpenseCategoriesList}
                />
                <Route path="/addcategory" component={AddCategory} />
                <Route
                  path="/expensecategorydetails/edit/:id"
                  component={AddCategory}
                />
                <Route
                  path="/expensecategorydetails/:id"
                  component={ExpenseCategoryDetails}
                />
                <Route path="" component={ExpensesList} />
                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
