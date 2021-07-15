import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom"
import { SpendingContext } from "../../providers/SpendingProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Heading, Container, Box, Table, Button, Icon, Form, Block } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faCheck, faBan, faPlus } from "@fortawesome/free-solid-svg-icons";
import moment from 'moment';
import { AreaChart } from './AreaChart';

export const SpendingSummary = () => {
  const {  getAllSpending, getSpendingByDates } = useContext(SpendingContext);
  const [ spendingSummaryData, setSpendingSummaryData ] = useState({});
  const { categories, getAllCategories } = useContext(CategoryContext);
  const [ dateBounds, setDateBounds ] = useState({});
  const [ userDefDates, setUserDefDates ] = useState(false);
  
  // const columns = ["Date", "Retailer", "Amount", "Category", " "];
  // const colSizes = [];
  const [ renderChart, setRenderChart ] = useState(false);
  const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

  useEffect(() => {
      getAllCategories()
      .then(() => {
        if (!userDefDates)
        {
          getAllSpending(loggedInUserId)
          .then(pR => {
            setRenderChart(true)
            setSpendingSummaryData(pR.data)
          })
        }
        else {
          getSpendingByDates(loggedInUserId, dateBounds.startDate, dateBounds.endDate)
          .then(pR => {
            setRenderChart(true)
            setSpendingSummaryData(pR.data)
          })
        }
      })
  }, []);
     

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
  //   const handleControlledInputChange = (event) => {
  //     //creating a copy of state to change and then set, using spread syntax to copy an object
  //     let newDateBound = { ...dateBounds }
  //     //post is an object with properties , set the property to the new value using obejct bracket notation
  //     newDateBound[event.target.id] = event.target.value
  //     //update state
  //     setDateBounds(newDateBound)
  //     setUserDefDates(true)
  // }

  return (
    <Container>
      <div className="row justify-content-center">
        <Box>
        <Block className="component-header">
          <Heading>Spending Summary</Heading>
          <div>
            {/* <Form.Field>
                <Form.Label>Start Date:</Form.Label>
                <Form.Control>
                    <Form.Input 
                        type="date" 
                        id="startDate" 
                        onChange={handleControlledInputChange} required autoFocus 
                        placeholder="Start Date" 
                        value={dateBounds.startDate} />
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <Form.Label>End Date:</Form.Label>
                <Form.Control>
                    <Form.Input 
                        type="date" 
                        id="endDate" 
                        onChange={handleControlledInputChange} required autoFocus 
                        placeholder="End Date" 
                        value={dateBounds.endDate} />
                </Form.Control>
            </Form.Field> */}
          </div>
          </Block>
          <Block>

            <div className="content-container">
              {(renderChart)?
                <AreaChart spendingSummaryData={spendingSummaryData} />
              :
                <p>loading</p>
              }
            </div>
          </Block>
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