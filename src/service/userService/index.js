// userService.js
import api from "../apiGateway";

const userService = {
  login(data = {}) {
    return api.post("/user/login", data);
  },

  // Add other user-related methods as needed
};

export default userService;
