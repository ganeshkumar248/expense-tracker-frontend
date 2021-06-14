import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div>
      <div class="sidebar">
        <Link to="/" className="active">
          {/* <FontAwesomeIcon icon={faHome} style={{ color: "red" }} /> */}
          &nbsp;Home
        </Link>
        <Link to="/about">
          {/* <FontAwesomeIcon icon={faHome} style={{ color: "red" }} /> */}
          About
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
