import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import AboutPage from "./components/AboutPage";
import AddCategory from "./components/AddCategory";
import AddExpense from "./components/AddExpense";
import ExpenseCategoriesList from "./components/ExpenseCategoriesList";
import ExpenseCategoryDetails from "./components/ExpenseCategoryDetails";
import ExpenseDetails from "./components/ExpenseDetails";
import ExpensesList from "./components/ExpensesList";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import Piechart from "./components/Piechart";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Sidebar />
        <div>
          <Switch>
            <Route exact path="/" component={ExpensesList} />
            <Route exact path={("/", "/expenses")} component={ExpensesList} />
            <Route path="/add" component={AddExpense} />
            <Route path="/expenses/edit/:id" component={AddExpense} />
            <Route path="/expenses/:id" component={ExpenseDetails} />
            <Route path="/about" component={AboutPage} />
            <Route path="/piechart" component={Piechart} />
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
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
