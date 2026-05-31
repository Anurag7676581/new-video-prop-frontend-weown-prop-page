import React, { useEffect } from "react";
import api from "../service/apiGateway";

const useAddReview = ( review ) => {
  console.log("adding review", review);
  const postData = async () => {
    try {
      const response =await  api.post(`/review/`, review);
      console.log("response", response);
    } catch (error) {
      console.log("error while adding review", error);
    }
  };
  useEffect(() => {
    postData();
  }, []);
};

export default useAddReview;
