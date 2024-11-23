import React, { useEffect } from "react";
import axiosInstance from "./utils/axiosInstance";

const Test = () => {
  useEffect(() => {
    console.log("Test component mounted");
    const fetchData = async () => {
      const response = await axiosInstance.get("http://localhost:5000/staffs");
      // const data = await response.json();
      console.log("Test component data", response);
    };
    fetchData();
    return () => {
      console.log("Test component unmounted");
    }
  }, []);
  return <div>Test</div>;
};

export default Test;
