import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";
import { Heading, Container, Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

export const AccountList=() => {
  const history = useHistory();
  const { accounts, getAllAccounts } = useContext(AccountContext);
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
  const columns = ["#", "Account Name", "Account Type", " "]

  useEffect(() => {
    getAllAccounts(loggedInUserId);
  }, []);

  const onClickEdit = (e) => {
    history.push(`/accounts/edit/${e.currentTarget.id}`);
  }
  
  const onClickDelete = (e) => {
    history.push(`/accounts/delete/${e.currentTarget.id}`);
  }

  return (
    <Container>
      <div className="columns">
        <Heading className="column">Accounts</Heading>
        <div className="column">
          <Button onClick={() => history.push("/accounts/add")}>
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
              {accounts?.sort((a1, a2) => a1.accountName.localeCompare(a2.accountName)).map((a, i) => {
                  
                  return (
                  <tr key={a.id}>
                    <td>{i+1}</td>
                    <td>{a.accountName}</td>
                    <td>{a.accountType.label}</td>
                    <td>
                        <Button id={a.id} onClick={onClickEdit}>
                            <Icon>
                            <FontAwesomeIcon icon={faEdit} />
                            </Icon>
                        </Button> 
                        <Button id={a.id} onClick={onClickDelete}>
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