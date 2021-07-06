import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BudgetContext } from "../../providers/BudgetProvider";
import { Heading, Container, Column, Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export const BudgetList=() => {
  const history = useHistory();
  const { budgets, getAllBudgets } = useContext(BudgetContext);
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id
  const columns = ["Category", "Amount", " "]

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
    <Container>
      <div className="columns">
        <Heading className="column">Budgets</Heading>
        <div className="column">
          <Button onClick={() => history.push("/budgets/add")}>
              <Icon>
                <FontAwesomeIcon icon={faPlus} />
              </Icon>
              <span>Add New</span>
          </Button>
        </div>
      </div>
      <Box>
        <Table>
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
                    <td>
                        <Button id={b.id} onClick={onClickEdit}>
                            <Icon>
                              <FontAwesomeIcon icon={faEdit} />
                            </Icon>
                        </Button> 
                        <Button id={b.id} onClick={onClickDelete}>
                            <Icon>
                              <FontAwesomeIcon icon={faTrash} />
                            </Icon>
                        </Button>
                    </td>
                  </tr>
                )})}
            </tbody>
        </Table>
      </Box>
    </Container>

  );
}