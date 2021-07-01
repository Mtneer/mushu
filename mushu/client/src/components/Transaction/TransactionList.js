import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { TransactionContext } from "../../providers/TransactionProvider";
// import { Post } from "./Post";

export const TransactionList = () => {
  const { Transactions, getAllTransactions } = useContext(TransactionContext);
  const columns = ["Transaction Date", "Retailer", "Amount", "Category"]
    // debugger
  useEffect(() => {
    getAllTransactions();
  }, []);

  const history = useHistory();

  const onClickEdit = (e) => {
    history.push(`/transaction/edit/${e.target.id}`);
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          <table>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Transactions.map((t) => {
                  
                  return (
                  <tr key={t.id}>
                    <td>{t.transactionDateTime.split("T",1)}</td>
                    <td>{t.title}</td>
                    <td>${t.amount}</td>
                    <td>{t.category?.name}</td>
                    <td><button id={t.id} onClick={onClickEdit}>Edit</button></td>
                  </tr>
                )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};