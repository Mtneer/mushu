import React, { useContext, useState, useEffect } from "react";
import {useParams, useHistory } from "react-router-dom";
import { BudgetContext } from '../../providers/BudgetProvider';

export const ConfirmDeleteBudget = () => {
    const { getBudgetById, deleteBudget, getAllBudgets } = useContext(BudgetContext);
    const { budgetId } = useParams();
    const [ budget, setBudget ] = useState({});
    const history = useHistory();
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id

    useEffect(() => {
        getBudgetById(budgetId)
        .then(setBudget)
    },[])

    const onClickConfirm = () => {
        deleteBudget(budgetId)
        .then(getAllBudgets(loggedInUserId)); 
        history.push("/budgets");
    }

    return (
        <div className="container">
          <div className="row justify-content-center">
            <h3>{`Are you sure you want to delete the ${budget?.category.name} budget of $${budget?.amount}?`}</h3>
          </div>
          <div className="row justify-content-center">
            <button onClick={onClickConfirm} className="button btn btn-sm btn-primary">
              Confirm
            </button>
            <button onClick={() => {history.push("/budgets")}} className="button btn btn-sm btn-secondary">
                Cancel
            </button>
          </div>
      </div>
    );
  }
  
  export default ConfirmDeleteBudget;