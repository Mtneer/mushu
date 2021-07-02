import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const CategoryContext = React.createContext();

export const CategoryProvider = (props) => {
  const apiUrl = "/api/Category";
  const { getToken } = useContext(UserProfileContext);
  
  const [ categories, setCategories ] = useState([]);
  
  const getAllCategories = () => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setCategories);
  };
  
  const getCategoryById = (categoryId) => {
    return getToken().then((token) =>
        fetch(`${apiUrl}/${categoryId}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
        .then(resp => resp.json())    
  }

  const addCategory = (category) => {
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
    }));
  };

  // Provider method to edit a category by sending a PUT request based on a Category Object
  // to the Web API with a firebase Token for authentication.
  const editCategory = (category) => {
    return getToken().then((token) => {
        fetch(apiUrl, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
    })}).then(getAllCategories())
  };

  const deleteCategory = (categoryId) => {
    getToken().then((token) =>
        fetch(`${apiUrl}/${categoryId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
    })).then(getAllCategories())
  };
  
  return (
    <CategoryContext.Provider value={{ categories, getAllCategories, addCategory, deleteCategory, editCategory, getCategoryById }}>
      {props.children}
    </CategoryContext.Provider>
  );
};