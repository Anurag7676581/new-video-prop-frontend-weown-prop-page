import React, { useEffect, useState } from "react";
import api from "../service/apiGateway";

const useGetAllBuilders = (  ) => {
  const [data1, setData] = useState([]);
  const [fetched1, setFetched] = useState(false);
  const [loading1, setLoading] = useState(false);
  const [error1, setError] = useState(null);
  const fetchdata = async () => {
    try {
      
      setLoading(true);
      const response = await api.get("/builder/all");
     
      setData(response?.data?.data);
      setFetched(true);
    } catch (error) {
      console.log("error while fetching all builders", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     fetchdata();
  }, []);

  return { fetched1, loading1, error1, data1 };
};

export default useGetAllBuilders ;
