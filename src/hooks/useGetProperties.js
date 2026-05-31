import React, { useEffect, useState } from "react";
import api from "../service/apiGateway";

const useGetProperties = (  ) => {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchdata = async () => {
    try {
      
      setLoading(true);
      const response = await api.get("/property/list?min-price=0&page=page-1");
      
      setData(response?.data?.data);
      setFetched(true);
    } catch (error) {
      console.log("error while fetching properties", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
     fetchdata();
  }, []);

  return { fetched, loading, error, data };
};

export default useGetProperties;
