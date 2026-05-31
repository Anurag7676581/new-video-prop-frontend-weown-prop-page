import React, { useEffect, useState } from 'react'
import api from "../service/apiGateway";

const useGetProjectsByBuilderId = (builder) => {
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [fetched,setFetched]=useState(false);
  const [error,setError]=useState(false);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/property/list?min-price=0&page=page-1&builder=${builder}`);
      
      setData(response?.data?.data);
      setFetched(true);
    } catch (error) {
      console.log("error while fetching builder's projects", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (builder) fetchdata();
  }, [builder]);

  return {fetched,loading,error,data};

}

export default useGetProjectsByBuilderId