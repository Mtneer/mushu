import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { TransactionContext } from "../../providers/TransactionProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Heading, Container, Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

export const TransactionList = () => {
  const { Transactions, getAllTransactions, editTransaction } = useContext(TransactionContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const columns = ["Date", "Retailer", "Amount", "Category"]
  const [ showCatDropdown, setShowCatDropdown ] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState({});


  useEffect(() => {
    getAllTransactions()
    .then(getAllCategories);
  }, []);

  const history = useHistory();

  const onClickEdit = (e) => {
    const currentTransaction = Transactions.find(t => t.id === parseInt(e.currentTarget.id))
    setShowCatDropdown(true);
    setTransactionToEdit({
      id: parseInt(e.currentTarget.id), 
      categoryId: currentTransaction.categoryId
    })
    // history.push(`/transaction/edit/${e.target.id}`);
  }

  const onClickConfirm = (e) => {
    debugger
    editTransaction({
      Id: transactionToEdit.id,
      CategoryId: parseInt(transactionToEdit.categoryId),
    })
    .then(getAllTransactions)
    .then(() => {
      setTransactionToEdit({})
      setShowCatDropdown(false)
    })
  }

  const onClickCancel = () => {
      setShowCatDropdown(false);
      setTransactionToEdit({});
  }

  //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
      //creating a copy of state to change and then set, using spread syntax to copy an object
      let newTransaction = { ...transactionToEdit }
      //post is an object with properties , set the property to the new value using obejct bracket notation
      newTransaction[event.target.id] = event.target.value
      //update state
      setTransactionToEdit(newTransaction)
  }

  return (
    <Container>
      <div className="row justify-content-center">
        <Heading>Transaction History</Heading>
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
              {Transactions.map((t) => {
                  return (
                  <tr key={t.id}>
                    <td>{t.transactionDateTime.split("T",1)}</td>
                    <td>{t.title}</td>
                    <td>${t.amount}</td>
                    {t.id === transactionToEdit.id ? 
                    <>
                      <td>
                        <select
                          value={transactionToEdit.categoryId}
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
                      </td>
                      <td>
                        <Button id={t.id} onClick={onClickConfirm}>
                          <Icon>
                            <FontAwesomeIcon icon={faCheck} />
                          </Icon>
                        </Button>
                        <Button id={t.id} onClick={onClickCancel}>
                          <Icon>
                            <FontAwesomeIcon icon={faBan} />
                          </Icon>
                        </Button>
                      </td>
                    </>
                    :
                    <>
                      <td>{t.category?.name}</td>
                      <td>
                        {!showCatDropdown ? 
                          <Button id={t.id} onClick={onClickEdit}>
                            <Icon>
                              <FontAwesomeIcon icon={faEdit} />
                            </Icon>
                          </Button>
                          :
                          <></>
                        }
                      </td>
                    </>
                    }
                  </tr>
                )})}
            </tbody>
          </Table>
        </Box>
      </div>
    </Container>
  );
};