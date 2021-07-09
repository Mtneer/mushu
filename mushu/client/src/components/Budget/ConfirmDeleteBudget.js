import React, { useContext, useState, useEffect } from "react";
import {useParams, useHistory } from "react-router-dom";
import { BudgetContext } from '../../providers/BudgetProvider';
import { Box, Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

export const ConfirmDeleteBudget = () => {
    const { getBudgetById, deleteBudget, getAllBudgets } = useContext(BudgetContext);
    const { budgetId } = useParams();
    const [ budget, setBudget ] = useState({});
    const history = useHistory();
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    useEffect(() => {
        getBudgetById(budgetId)
        .then((parsedR) => setBudget(parsedR));
    },[])

    const onClickConfirm = () => {
        deleteBudget(budgetId)
        .then(getAllBudgets(loggedInUserId)) 
        history.push("/budgets");
    }

    return (
      <Box>
        <form>
          <Form.Field>
            <Form.Label>
              <h3>{`Are you sure you want to delete the ${budget.category?.name} budget of $${budget.amount}?`}</h3>
            </Form.Label>
            <Button.Group align='center'>
              <Button onClick={onClickConfirm}>
                  <Icon>
                    <FontAwesomeIcon icon={faCheck} />
                  </Icon>
                  <span>Confirm</span>
              </Button>
              <Button onClick={() => {history.push("/budgets")}}>
                  <Icon>
                    <FontAwesomeIcon icon={faBan} />
                  </Icon>
                  <span>Cancel</span>
              </Button>
            </Button.Group>
          </Form.Field>
        </form>
      </Box>
    );
  }
  
  export default ConfirmDeleteBudget;