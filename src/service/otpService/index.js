// userService.js
import api from "../apiGateway";

const otpService = {
  async getOtp(phone) {
    console.log("phonenumber-> ", phone);
    console.log("type of phone number ->", typeof phone);

    return await api.get(`/user/otp?phoneNumber=${parseInt(phone)}`);
  },
};

export default otpService;
