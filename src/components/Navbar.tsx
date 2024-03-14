import { Layout, Button } from "antd";
const { Header } = Layout;
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  const handleSignOut = () => {
    sessionStorage.clear();
    setUser(null);
    navigate("./login");
  };

  return (
    <Header className="flex justify-between items-center w-full">
      <div className="text-white text-lg">React Poll</div>
      <Button type="primary" className="text-white">
        <Link to="/" className="nav-link">
          Home
        </Link>
      </Button>
      <div>
        {user ? (
          <Button type="link" className="text-white" onClick={handleSignOut}>
            Sign Out
          </Button>
        ) : (
          <div className="flex">
            <Link to="/login" className="nav-link">
              <Button type="link" className="text-white">
                Sign In
              </Button>
            </Link>
            <Link to="/register" className="nav-link">
              <Button type="link" className="text-white">
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Header>
  );
};

export default Navbar;
