import React, { useContext, useEffect, useState } from "react"
import { TransactionContext } from "../../providers/TransactionProvider";
import { AccountContext } from "../../providers/AccountProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory } from 'react-router-dom';
import { Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Importer, ImporterField } from 'react-csv-importer';
import { TransactionCategoryForm } from './TransactionCategoryForm';
import 'react-csv-importer/dist/index.css';
import moment from 'moment';


export const TransactionForm = () => {
    const { addTransactions, getAllTransactions } = useContext(TransactionContext);
    const { accounts, getAllAccounts } = useContext(AccountContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;
    const [isDisabled, setIsDisabled] = useState(true);

    const history = useHistory();

    // wait for data before button is active
    const [isFinished, setIsFinished] = useState(false);
    const [transactionsToAdd, setTransactionsToAdd] = useState([]);
    const [selectedAccountId, setSelectedAccountId] = useState();

    useEffect(() => {
        getAllAccounts(loggedInUserId)
        .then(getAllCategories)
    }, [])

    const onClickSubmit = () => {

        addTransactions(transactionsToAdd)
        .then(getAllTransactions)
        .then(() => history.push(`/transactions`))
    }

    return (
        <div className="transactionForm">
            <h2 className="transactionForm__title">Import New Transactions</h2>
            <div className="column" align-content='flex-end'>
                <Button onClick={onClickSubmit} disabled={isDisabled}>
                    <Icon>
                        <FontAwesomeIcon icon={faCheck} />
                    </Icon>
                    <span>Submit Transactions</span>
                </Button>
            </div>
            <div>
                <label htmlFor="category">Account:</label>
                <select
                    value={selectedAccountId}
                    name="category"
                    id="categoryId"
                    onChange={e => {
                        setSelectedAccountId(e.target.value);
                    }}
                    required
                    className="form-control" >
                    <option value="0">Select an account</option>
                    {accounts.map(a => (
                        <option
                            key={a.id}
                            value={a.id}>
                            {a.accountName} - {a.accountType.label}
                        </option>
                    ))}
                </select>
            </div>
            {(isFinished) ? 
            <TransactionCategoryForm 
                transactionsToAdd={transactionsToAdd} 
                setTransactionsToAdd={setTransactionsToAdd} 
                isDisabled={isDisabled}
                setIsDisabled={setIsDisabled} />
            :
            <Importer
                chunkSize={10000} // optional, internal parsing chunk size in bytes
                assumeNoHeaders={false} // optional, keeps "data has headers" checkbox off by default
                restartable={false} // optional, lets user choose to upload another file when import is complete
                onStart={({ file, fields, columns, skipHeaders }) => {
                    // optional, invoked when user has mapped columns and started import
                    console.log("starting import of file", file, "with fields", fields);
                }}
                processChunk={async (rows, { startIndex }) => {
                    // required, receives a list of parsed objects based on defined fields and user column mapping;
                    // may be called several times if file is large
                    // (if this callback returns a promise, the widget will wait for it before parsing more data)
                    console.log("received batch of rows", rows);
                    setTransactionsToAdd(rows);
                    // debugger

                    // mock timeout to simulate processing
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }}
                onComplete={({ file, preview, fields, columnFields }) => {
                    // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
                    // showMyAppToastNotification();
                    const listOfTransactions = [...transactionsToAdd];
                    if (!listOfTransactions[0].category) {
                        listOfTransactions.forEach(t => {
                            t.category = null;
                            t.categoryId = 0;
                            t.accountId = +selectedAccountId;
                            t.transactionDateTime = moment(t.transactionDateTime).format();
                        })
                    } else {
                        listOfTransactions.forEach(t => {
                            if (t.category === null) {
                                t.categoryId = 0;
                            } else {
                                const cat = categories.find(c => t.category.includes(c.name))
                                if (cat) {
                                    t.categoryId = cat.id;
                                    t.category = cat;
                                } else {
                                    t.categoryId = 0;
                                }
                            }
                            t.accountId = +selectedAccountId;
                            t.transactionDateTime = moment(t.transactionDateTime).format(); 
                        })
                    }
                }}
                onClose={() => {
                    console.log('user clicked Finish');
                    // optional, invoked when import is done and user clicked "Finish"
                    // (if this is not specified, the widget lets the user upload another file)
                    // addTransactions(transactionsToAdd)
                    // .then(history.push(`/transactions`))
                    setIsFinished(true);
                    
                }}
                >
                <ImporterField name="transactionDateTime" label="Transaction Date Time" />
                <ImporterField name="title" label="Retailer" />
                <ImporterField name="amount" label="Amount" />
                <ImporterField name="category" label="Category" optional />
            </Importer>
            }
        </div>
    )
}