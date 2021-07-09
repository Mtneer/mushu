import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const SpendingContext = React.createContext();

export const SpendingProvider = (props) => {
  const apiUrl = "/api/Spending";
  const { getToken } = useContext(UserProfileContext);
  
  const getAllSpending = (loggedInUserId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${loggedInUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
  };

  return (
    <SpendingContext.Provider value={{ getAllSpending }}>
      {props.children}
    </SpendingContext.Provider>
  );
};