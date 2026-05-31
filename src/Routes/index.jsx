import React from "react";
import { Route, Routes } from "react-router-dom";
import PropertyDescription from "../pages/Propertydescription";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<PropertyDescription />} />
      <Route path="/property/:id" element={<PropertyDescription />} />
      <Route
        path="/property_description/:id"
        element={<PropertyDescription />}
      />
    </Routes>
  );
};
