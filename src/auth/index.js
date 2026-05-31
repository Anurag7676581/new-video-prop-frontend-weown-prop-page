import React from "react";

export const isLoggedIn = () => {
  const data = localStorage.getItem("data");
  if (data === null) {
    return false;
  } else {
    return true;
  }
};

export const setLocalStorage = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
};

export const emptyLocalstorage = () => {
  localStorage.removeItem("data");
};
