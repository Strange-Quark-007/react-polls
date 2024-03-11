import { Layout, Menu, Button } from "antd";
const { Header } = Layout;
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("./login");
  };

  return (
    <Header className="flex justify-between items-center">
      <div className="text-white text-lg">React Poll</div>
      <Menu theme="dark" mode="horizontal">
        <Button type="primary" className="text-white">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </Button>
      </Menu>
      <div>
        {sessionStorage.getItem("user") ? (
          <Button type="link" className="text-white" onClick={handleSignOut}>
            Sign out
          </Button>
        ) : (
          <>
            <Button type="link" className="text-white">
              <Link to="/login" className="nav-link">
                Sign In
              </Link>
            </Button>
            <Button type="link" className="text-white">
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
