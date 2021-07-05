import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { BudgetContext } from "../../providers/BudgetProvider";

export const BudgetForm = () => {
  
    const history = useHistory();
    //exposing the addCategory function from the CategoryProdiver
    const { getBudgetById, addBudget, editBudget, getAllBudgets } = useContext(BudgetContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    // setting categroryText to an empty state so we can add in the new category information
    const [ budgetFormInput, setBudgetFormInput] = useState();
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const {budgetId} = useParams();

    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        getAllCategories()
        .then(() => {
            if (budgetId) {
                getBudgetById(budgetId)
                .then(budget => {
                    setBudgetFormInput(budget)
                    setIsLoading(false)
                })
            } else {
                setIsLoading(false)
            }
        })
    },[])
  
  
    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newBudget = { ...budgetFormInput }
        //category is an object with properties , set the property to the new value using obejct bracket notation
        newBudget[event.target.id] = event.target.value
        //update state
        setBudgetFormInput(newBudget)
    }
  
    const handleClickSaveBudget = (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (budgetId) {
            // PUT update
            editBudget({
                Id: parseInt(budgetId),
                Amount: parseFloat(budgetFormInput.amount),
                CategoryId: parseInt(budgetFormInput.categoryId),
                UserProfileId: loggedInUserId
            })
            .then(getAllBudgets(loggedInUserId))
            .then(() => history.push(`/budgets`))
        } else {
            addBudget({
                Amount: parseFloat(budgetFormInput.amount),
                CategoryId: parseInt(budgetFormInput.categoryId),
                UserProfileId: loggedInUserId
            })
            .then(getAllBudgets(loggedInUserId))
            .then(() => history.push(`/budgets`))
        }
    }
  
    return (
        <form className="budgetForm">
        <h2 className="budgetForm__title">{(budgetId)? "Edit Budget" : "Add Budget"}</h2>
        {(budgetId)? 
        <h5>{budgetFormInput?.category.name}</h5> :
        <fieldset className="col-6">
            <label htmlFor="category">Category:</label>
            <select
                value={budgetFormInput?.categoryId}
                name="category"
                id="categoryId"
                onChange={handleControlledInputChange}
                required
                className="form-control" >
                <option value="0">Select a category</option>
                {categories.map(currentCategory => (
                    <option
                        key={currentCategory.id}
                        value={currentCategory.id}>
                        {currentCategory.name}
                    </option>
                ))}
            </select>
        </fieldset>
        }
        <fieldset>
            <div className="form-group">
                <label htmlFor="title">Budget Amount:</label>
                <input type="text" id="amount" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="Amount" value={budgetFormInput?.amount} />
            </div>
        </fieldset>
        
        <button className="btn btn-primary"
            onClick={handleClickSaveBudget}
            disable={isLoading.toString()}>
            {budgetId ? <>Save Budget</>:<>Add Budget</>}
            </button>
            <button className="button btn btn-sm btn-secondary" onClick={() => {history.push("/budgets")}}>Cancel</button>
        </form>
    );
}