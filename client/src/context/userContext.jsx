import { createContext, useState } from "react";

export const UserContext = createContext(null);

const UserContextProider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userdata")) || null
  );

  //SET USER DATA
  const setUser = (data) => {
    if (!localStorage.getItem("userdata")) {
      window.localStorage.setItem("userdata", JSON.stringify(data));
      setUserData(data);
    } else {
      setUserData(JSON.parse(localStorage.getItem("userdata")));
    }
  };

  //REMOVE USER DATA
  const removeUser = () => {
    window.localStorage.removeItem("userdata");
    setUserData(null);
  };

  return (
    <UserContext.Provider value={{ userData, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProider;
