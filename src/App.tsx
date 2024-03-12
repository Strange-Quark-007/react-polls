import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { User } from "./types";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PollUser from "./pages/PollUser";
import PollAdmin from "./pages/PollAdmin";

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => null,
});

const App = () => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="/user/:pollId" element={<PollUser />} />
          <Route path="/admin/:pollId" element={<PollAdmin />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
