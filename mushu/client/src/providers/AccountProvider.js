import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const AccountContext = React.createContext();

export const AccountProvider = (props) => {
  const apiUrl = "/api/Account";
  const { getToken } = useContext(UserProfileContext);
 
  const [ accounts, setAccounts ] = useState([]);
  const [ accountTypes, setAccountTypes ] = useState([]);
  
  const getAllAccounts = (loggedInUserId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${loggedInUserId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setAccounts);
  };

  const getAllAccountTypes = () => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/AccountTypes`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setAccountTypes);
  };
  
  const getAccountById = (accountId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/Detail/${accountId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(resp => resp.json())    
  }

  const addAccount = (account) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account)
    }));
  };

  // Provider method to edit a category by sending a PUT request based on a Category Object
  // to the Web API with a firebase Token for authentication.
  const editAccount = (account) => {
    return getToken().then((token) => {
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(account)
    })})
  };

  const deleteAccount = (accountId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${accountId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
    }))
  };
  
  return (
    <AccountContext.Provider value={{ accounts, accountTypes, getAllAccounts, getAllAccountTypes, getAccountById, addAccount, deleteAccount, editAccount }}>
      {props.children}
    </AccountContext.Provider>
  );
};