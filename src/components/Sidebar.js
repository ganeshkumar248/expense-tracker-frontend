import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div class="sidebar">
        <Link to="/expenses" className="active">
          &nbsp;Home
        </Link>
        <Link to="/expensecategories">Categories</Link>
        <Link to="/about">About</Link>
      </div>
    </div>
  );
};

export default Sidebar;
