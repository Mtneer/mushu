import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { BudgetContext } from "../../providers/BudgetProvider";
import { Box, Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

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
        <Box>
            <form className="budgetForm">
            <h2 className="budgetForm__title">{(budgetId)? "Edit Budget" : "Add Budget"}</h2>
            {(budgetId)? 
            <h5>{budgetFormInput?.category.name}</h5> :
            <Form.Field>
                <Form.Label>Category:</Form.Label>
                <Form.Control>
                    <Form.Select
                        value={budgetFormInput?.categoryId}
                        name="category"
                        id="categoryId"
                        onChange={handleControlledInputChange}
                        required>
                        <option value="0">Select a category</option>
                        {categories.map(currentCategory => (
                            <option
                                key={currentCategory.id}
                                value={currentCategory.id}>
                                {currentCategory.name}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Control>
            </Form.Field>
            }
            <Form.Field>
                <Form.Label>Budget Amount:</Form.Label>
                <Form.Control>
                    <Form.Input type="text" id="amount" onChange={handleControlledInputChange} required autoFocus placeholder="Amount" value={budgetFormInput?.amount} />
                </Form.Control>
            </Form.Field>
            <Form.Field kind="group">
                <Form.Control>
                    <Button 
                        onClick={handleClickSaveBudget}
                        disable={isLoading.toString()}>
                            <Icon>
                                <FontAwesomeIcon icon={faCheck} />
                            </Icon>
                            {budgetId ? <span>Save Budget</span>:<span>Add Budget</span>}
                    </Button>
                </Form.Control>
                <Form.Control>
                    <Button 
                        onClick={() => {history.push("/budgets")}}>
                            <Icon>
                                <FontAwesomeIcon icon={faBan} />
                            </Icon>
                            <span>Cancel</span>
                    </Button>
                </Form.Control>
            </Form.Field>  
            </form>
        </Box>
    );
}