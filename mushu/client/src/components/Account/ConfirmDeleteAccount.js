import React, { useContext, useState, useEffect } from "react";
import {useParams, useHistory } from "react-router-dom";
import { AccountContext } from '../../providers/AccountProvider';
import { Box, Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

export const ConfirmDeleteAccount = () => {
    const { getAccountById, deleteAccount, getAllAccounts } = useContext(AccountContext);
    const { accountId } = useParams();
    const [ account, setAccount ] = useState({});
    const history = useHistory();
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    useEffect(() => {
        getAccountById(accountId)
        .then((parsedR) => setAccount(parsedR));
    },[])

    const onClickConfirm = () => {
        deleteAccount(accountId)
        .then(getAllAccounts(loggedInUserId)) 
        history.push("/accounts");
    }

    return (
      <Box>
        <form>
          <Form.Field>
            <Form.Label>
              <h3>{`Are you sure you want to delete the ${account.accountName} account?`}</h3>
            </Form.Label>
            <Button.Group align='center'>
              <Button onClick={onClickConfirm}>
                  <Icon>
                    <FontAwesomeIcon icon={faCheck} />
                  </Icon>
                  <span>Confirm</span>
              </Button>
              <Button onClick={() => {history.push("/accounts")}}>
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
  
  export default ConfirmDeleteAccount;