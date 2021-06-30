import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const TransactionContext = React.createContext();

export const TransactionProvider = (props) => {
  const apiUrl = "/api/Transaction";
  const { getToken } = useContext(UserProfileContext);
  
  const [ Transactions, setTransactions ] = useState([]);

  const getAllTransactions = () => {
    //   debugger
    return getToken().then((token) =>
        fetch(apiUrl, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }))
      .then(resp => resp.json())
      .then(setTransactions);
  };

//   const addPost = (post) => {
//     // debugger
//     return getToken().then((token) =>
//       fetch(apiUrl, {
//             method: "POST",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(post)
//           }))
//           .then(resp => resp.json())
//   };

//   const getPostById = (postId) => {
//     return getToken().then((token) =>
//         fetch(`${apiUrl}/${postId}`, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         }))
//         .then(resp => resp.json())    
//   }

  // Provider method to edit a post by sending a PUT request based on a Post Object
  // to the Web API with a firebase Token for authentication.
//   const editTransaction = (transaction) => {
//     // debugger
//     return getToken().then((token) => {
//         // debugger
//         fetch(apiUrl, {
//             method: "PUT",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(transaction)
//     })});
//   };

  // Provider method to delete a post by sending a DELETE request based on a Post's ID
  // to the Web API with a firebase Token for authentication.
//   const deletePost = (postId) => {
//     debugger
//     return getToken().then((token) =>
//         fetch(`${apiUrl}/${postId}`, {
//             method: "DELETE",
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//     }));
//   };

  return (
    <TransactionContext.Provider value={{ Transactions, getAllTransactions }}>
      {props.children}
    </TransactionContext.Provider>
  );
};