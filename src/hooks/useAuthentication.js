import React from "react";
import { getToken, decodeToken } from "../utils";

const useAuthentication = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  const token = getToken();
};

export default useAuthentication;
