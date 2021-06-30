import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../../providers/TransactionProvider";
// import { Post } from "./Post";

export const TransactionList = () => {
  const { Transactions, getAllTransactions } = useContext(TransactionContext);
    // debugger
  useEffect(() => {
    getAllTransactions();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="cards-column">
          {Transactions.map((t) => {
              debugger
              const dateTime = Date(t.transactionDateTime);
              debugger
              return (
              <div key={t.id}>
                <p>{dateTime.toLocaleString('en-US')}</p>
                <p>{t.title}</p>
                <p>${t.amount}</p>
              </div>
            )})}
        </div>
      </div>
    </div>
  );
};