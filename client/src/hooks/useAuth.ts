import { useContext } from "react";
import { AuthContext } from "../context/isAuth";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;