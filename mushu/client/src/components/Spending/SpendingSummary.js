import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { SpendingContext } from "../../providers/SpendingProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Heading, Container, Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
// import moment from 'moment';
import useChartConfig from 'UseChartConfig'
import SyntaxHighlighter from 'SyntaxHighlighter'
import { Chart } from 'react-charts'

export const SpendingSummary = () => {
  const { getAllSpending } = useContext(SpendingContext);
  const { categories, getAllCategories } = useContext(CategoryContext);
  const columns = ["Date", "Retailer", "Amount", "Category", " "];
  const colSizes = [];
  const [ showCatDropdown, setShowCatDropdown ] = useState(false);
  const [ spendingSummary, setSpendingSummary ] = useState({});
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;



  useEffect(() => {
      getAllCategories()
      .then(getAllSpending(loggedInUserId))
      .then((pr) => {
        debugger
        setSpendingSummary(pr)});
  }, []);

  const history = useHistory();

  const axes = React.useMemo(
    () => [
      { primary: true, type: 'linear', position: 'bottom' },
      { type: 'linear', position: 'left' },
    ],
    []
  )

//   const onClickConfirm = (e) => {
//     debugger
//     editTransaction({
//       Id: transactionToEdit.id,
//       CategoryId: parseInt(transactionToEdit.categoryId),
//     })
//     .then(getAllSpending(loggedInUserId))
//     .then(() => {
//       setTransactionToEdit({})
//       setShowCatDropdown(false)
//     })
//   }

//   const onClickCancel = () => {
//       setShowCatDropdown(false);
//       setTransactionToEdit({});
//   }

  //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
//     const handleControlledInputChange = (event) => {
//       //creating a copy of state to change and then set, using spread syntax to copy an object
//       let newTransaction = { ...transactionToEdit }
//       //post is an object with properties , set the property to the new value using obejct bracket notation
//       newTransaction[event.target.id] = event.target.value
//       //update state
//       setTransactionToEdit(newTransaction)
//   }

  return (
    <Container>
      <div className="row justify-content-center">
        <Box>
          <Heading>Spending Summary</Heading>
          <Chart data={spendingSummary?.data} series={spendingSummary?.series} axes={axes} tooltip />
          {/* <Table>
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
                    <td>{moment(t.transactionDateTime).format('l')}</td>
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
          </Table> */}
        </Box>
      </div>
    </Container>
  );
};