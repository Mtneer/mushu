import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom"
import { TransactionContext } from "../../providers/TransactionProvider";
import { Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-regular-svg-icons";

export const TransactionList = () => {
  const { Transactions, getAllTransactions } = useContext(TransactionContext);
  const columns = ["Date", "Retailer", "Amount", "Category"]
    // debugger
  useEffect(() => {
    getAllTransactions();
  }, []);

  const history = useHistory();

  const onClickEdit = (e) => {
    debugger
    history.push(`/transaction/edit/${e.target.id}`);
  }

  return (
    <div className="container">
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
              {Transactions.map((t) => {
                  return (
                  <tr key={t.id}>
                    <td>{t.transactionDateTime.split("T",1)}</td>
                    <td>{t.title}</td>
                    <td>${t.amount}</td>
                    <td>{t.category?.name}</td>
                    <td>
                      <Button id={t.id} onClick={onClickEdit}>
                        <Icon id={t.id}>
                          <FontAwesomeIcon icon={faEdit} />
                        </Icon>
                      </Button>
                    </td>
                  </tr>
                )})}
            </tbody>
          </Table>
        </Box>
      </div>
    </div>
  );
};