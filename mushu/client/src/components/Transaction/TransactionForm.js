import React, { useContext, useEffect, useState } from "react"
import { TransactionContext } from "../../providers/TransactionProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams } from 'react-router-dom';
import { Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { Importer, ImporterField } from 'react-csv-importer';
import 'react-csv-importer/dist/index.css';


export const TransactionForm = () => {
    const { getTransactionById, editTransaction } = useContext(TransactionContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [transactionToEdit, setTransactionToEdit] = useState({});
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const {transactionId} = useParams();
    const history = useHistory();

    // wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     getAllCategories()
    //     .then(() => {
    //         getTransactionById(transactionId)
    //         .then(transaction => {
    //             setTransactionToEdit(transaction)
    //             setIsLoading(false)
    //         })
    //     })
    // }, []);

    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    // const handleControlledInputChange = (event) => {
    //     //creating a copy of state to change and then set, using spread syntax to copy an object
    //     let newTransaction = { ...transactionToEdit }
    //     //post is an object with properties , set the property to the new value using obejct bracket notation
    //     newTransaction[event.target.id] = event.target.value
    //     //update state
    //     setTransactionToEdit(newTransaction)
    // }

    // const handleClickSaveTransaction = (event) => {
    //     event.preventDefault();
    //     setIsLoading(true);
    //     // if (postId) {
    //         // PUT update
    //         editTransaction({
    //             Id: parseInt(transactionId),
    //             Title: transactionToEdit.title,
    //             Amount: transactionToEdit.amount,
    //             TransactionDateTime: transactionToEdit.transactionDateTime,
    //             CategoryId: parseInt(transactionToEdit.categoryId),
    //         })
    //         .then(() => history.push(`/transactions`))
    //     // } else {
    //     //     // debugger
    //     //     addPost({
    //     //         userProfileId: loggedInUserId,
    //     //         Title: postFormInput.title,
    //     //         Content: postFormInput.content,
    //     //         PublishDateTime: postFormInput.publishDateTime,
    //     //         ImageLocation: postFormInput.imageLocation,
    //     //         CategoryId: parseInt(postFormInput.categoryId),
    //     //         IsApproved: true
    //     //     })
    //     //     .then((parsedRes) => history.push(`/post/detail/${parsedRes.id}`))
    //     // }
    // }

    return (
        <div className="transactionForm">
            <h2 className="transactionForm__title">Import New Transactions</h2>
        {/* // //<h4 className="transactionForm__retailer">{transactionToEdit?.title}</h4>
        //     <fieldset className="col-6">
        //         <label htmlFor="category">Category:</label>
        //         <select
        //             value={transactionToEdit?.categoryId}
        //             name="category"
        //             id="categoryId"
        //             onChange={handleControlledInputChange}
        //             required
        //             className="form-control" >
        //             <option value="0">Select a category</option>
        //             {categories.map(currentCategory => (
        //                 <option
        //                     key={currentCategory.id}
        //                     value={currentCategory.id}>
        //                     {currentCategory.name}
        //                 </option>
        //             ))}
        //         </select>
        //     </fieldset> */}
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

                    // mock timeout to simulate processing
                    await new Promise((resolve) => setTimeout(resolve, 500));
                }}
                onComplete={({ file, preview, fields, columnFields }) => {
                    // optional, invoked right after import is done (but user did not dismiss/reset the widget yet)
                    // showMyAppToastNotification();
                }}
                onClose={({ file, preview, fields, columnFields }) => {
                    // optional, invoked when import is done and user clicked "Finish"
                    // (if this is not specified, the widget lets the user upload another file)
                    // goToMyAppNextPage();
                }}

                // CSV options passed directly to PapaParse if specified:
                // delimiter={...}
                // newline={...}
                // quoteChar={...}
                // escapeChar={...}
                // comments={...}
                // skipEmptyLines={...}
                // delimitersToGuess={...}
                >
                <ImporterField name="transactionDateTime" label="Transaction Date Time" />
                <ImporterField name="title" label="Retailer" />
                <ImporterField name="amount" label="Amount" />
                {/* <ImporterField name="postalCode" label="Postal Code" optional /> */}
            </Importer>
        {/* //     <div className="button-container">
        //         <button className="button btn btn-primary"
        //             onClick={handleClickSaveTransaction} disable={isLoading.toString()}>
        //             Save Transaction
        //         </button>
        //         <button className="button btn btn-sm btn-secondary" onClick={() => {history.push("/transactions")}}>Cancel</button>
            // </div> */}
        </div>
    )
}