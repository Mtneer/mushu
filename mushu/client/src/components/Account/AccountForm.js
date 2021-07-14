import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AccountContext } from "../../providers/AccountProvider";
import { Box, Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

export const AccountForm = () => {
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id

    const history = useHistory();
    //exposing the addCategory function from the CategoryProdiver
    const { accountTypes, addAccount, getAccountById, editAccount, getAllAccounts, getAllAccountTypes } = useContext(AccountContext);
    // setting categroryText to an empty state so we can add in the new category information
    const [accountFormInput, setAccountFormInput] = useState();

    const {accountId} = useParams();

    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        getAllAccountTypes()
        .then(() => {
            if (accountId) {
                getAccountById(accountId)
                .then(account => {
                    setAccountFormInput(account)
                    setIsLoading(false)
                })
            }
        })
    },[])
  
  
    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newAccount = { ...accountFormInput }
        //category is an object with properties , set the property to the new value using obejct bracket notation
        newAccount[event.target.id] = event.target.value
        //update state
        setAccountFormInput(newAccount)
    }
  
    const handleClickSaveAccount = (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (accountId) {
            // PUT update
            editAccount({
                Id: parseInt(accountId),
                AccountName: accountFormInput.accountName,
                AccountTypeId: accountFormInput.accountTypeId
            })
            .then(getAllAccounts(loggedInUserId))
            .then(() => history.push(`/accounts`))
        } else {
            addAccount({
                AccountName: accountFormInput.accountName,
                AccountTypeId: accountFormInput.accountTypeId,
                UserProfileId: loggedInUserId
            })
            .then(getAllAccounts(loggedInUserId))
            .then(() => history.push(`/accounts`))
        }
    }
  
    return (
        <Box>
            <form className="accountForm">
            <h2 className="accountForm__title">{(accountId)? "Edit Account" : "Add Account"}</h2>
            <Form.Field>
                <Form.Label>Account Name:</Form.Label>
                <Form.Control>
                    <Form.Input
                        type="text" 
                        id="accountName" 
                        onChange={handleControlledInputChange} required autoFocus 
                        placeholder="Account Name" 
                        value={accountFormInput?.accountName} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>Account Type:</Form.Label>
                <Form.Control>
                    <Form.Select 
                        value={accountFormInput?.accountTypeId}
                        name="accountType"
                        id="accountTypeId"
                        onChange={handleControlledInputChange}
                        required>
                        <option value="0">Select an Account Type</option>
                        {accountTypes.map(currentAccountType => (
                            <option
                                key={currentAccountType.id}
                                value={currentAccountType.id}>
                                {currentAccountType.label}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Control>
            </Form.Field>
            <Form.Field kind="group">
                <Form.Control>
                    <Button 
                        onClick={handleClickSaveAccount}
                        disable={isLoading.toString()}>
                            <Icon>
                                <FontAwesomeIcon icon={faCheck} />
                            </Icon>
                            {accountId ? <span>Save Account</span>:<span>Add Account</span>}
                    </Button>
                </Form.Control>
                <Form.Control>
                    <Button 
                        onClick={() => {history.push("/accounts")}}>
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