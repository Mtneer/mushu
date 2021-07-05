import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const BudgetContext = React.createContext();

export const BudgetProvider = (props) => {
  const apiUrl = "/api/Budget";
  const { getToken } = useContext(UserProfileContext);
 
  const [ budgets, setBudgets ] = useState([]);
  
  const getAllBudgets = (loggedInUserId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${loggedInUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setBudgets);
  };
  
  const getBudgetById = (budgetId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/Detail/${budgetId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(resp => resp.json())    
  }

  const addBudget = (budget) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(budget)
    }));
  };

  // Provider method to edit a category by sending a PUT request based on a Category Object
  // to the Web API with a firebase Token for authentication.
  const editBudget = (budget) => {
    return getToken().then((token) => {
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(budget)
    })})
  };

  const deleteBudget = (budgetId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${budgetId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
    }))
  };
  
  return (
    <BudgetContext.Provider value={{ budgets, getAllBudgets, addBudget, deleteBudget, editBudget, getBudgetById }}>
      {props.children}
    </BudgetContext.Provider>
  );
};