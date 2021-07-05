import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BudgetContext } from "../../providers/BudgetProvider";

import { Button } from "reactstrap";

export const BudgetList=() => {
  const history = useHistory();
  const { budgets, getAllBudgets } = useContext(BudgetContext);
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
  const columns = ["Category", "Amount"]

  useEffect(() => {
    getAllBudgets(loggedInUserId);
  }, []);

  const onClickEdit = (e) => {
    history.push(`/budgets/edit/${e.target.id}`);
  }
  
  const onClickDelete = (e) => {
    history.push(`/budgets/delete/${e.target.id}`);
  }

  return (
    <div className="container">

      <div><Button onClick={() => history.push("/budgets/add")}>Create Budget</Button></div>
      <div className="row justify-content-center">
        <table>
            <thead>
              <tr>
                {columns.map((col, index) => (
                  <th key={index}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {budgets?.sort((a1, a2) => a1.category.name.localeCompare(a2.category.name)).map((b, i) => {
                  
                  return (
                  <tr key={b.id}>
                    <td>{b.category?.name}</td>
                    <td>{b.amount}</td>
                    <td><button id={b.id} onClick={onClickEdit}>Edit</button></td>
                    <td><button id={b.id} onClick={onClickDelete}>Delete</button></td>
                  </tr>
                )})}
            </tbody>
        </table>
      </div>
    </div>

  );
}