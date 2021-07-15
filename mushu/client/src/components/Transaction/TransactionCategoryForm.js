import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { TransactionContext } from "../../providers/TransactionProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Heading, Container, Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';

export const TransactionCategoryForm = ({transactionsToAdd, setTransactionsToAdd, isDisabled, setIsDisabled}) => {

  const { Transactions, getAllTransactions, editTransaction } = useContext(CategoryContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const columns = ["Date", "Retailer", "Amount", "Category", " "];
  const colSizes = [];

  useEffect(() => {
    getAllCategories();
  }, []);

  const history = useHistory();

  //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (e) => {
        debugger
        const newTransactionsToAdd = [...transactionsToAdd];
        const tId = +e.target.id;
        newTransactionsToAdd[tId-1].categoryId = +e.target.value;
        newTransactionsToAdd[tId-1].category = categories.find(c => c.id === parseInt(e.target.value));
        setTransactionsToAdd(newTransactionsToAdd);
        const numUnassigned = transactionsToAdd.filter(t => t.categoryId === 0).length;
        if (numUnassigned === 0) {
            setIsDisabled(false)
        }
    }

  return (
    <Container>
      <div className="row justify-content-center">
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
              {transactionsToAdd.map((t, i) => {
                  debugger
                  return (
                  <tr key={i+1}>
                    <td>{moment(t.transactionDateTime).format('l')}</td>
                    <td>{t.title}</td>
                    <td>${t.amount}</td>
                    {t.categoryId === 0 ? 
                    <>
                      <td>
                        <select
                          value={t.categoryId}
                          name="category"
                          id={i+1}
                          onChange={handleControlledInputChange}
                          required
                          className="form-control" >
                            <option value="0">Select a category</option>
                            {categories.map(c => (
                                <option
                                    key={c.id}
                                    value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                      </td>
                    </>
                    :
                    <>
                      <td>{t.category?.name}</td>
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