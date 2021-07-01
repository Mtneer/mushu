import React, { useContext, useEffect, useState } from "react"
import { TransactionContext } from "../../providers/TransactionProvider";
import { CategoryContext } from "../../providers/CategoryProvider";
import { useHistory, useParams } from 'react-router-dom';
// import "./Post.css";

export const TransactionForm = () => {
    const { getTransactionById, editTransaction } = useContext(TransactionContext);
    const { categories, getAllCategories } = useContext(CategoryContext);
    const [transactionToEdit, setTransactionToEdit] = useState({});
    const loggedInUserId = JSON.parse(sessionStorage.getItem("userProfile")).id;

    const {transactionId} = useParams();
    const history = useHistory();

    // wait for data before button is active
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getAllCategories()
        .then(() => {
            getTransactionById(transactionId)
            .then(transaction => {
                setTransactionToEdit(transaction)
                setIsLoading(false)
            })
        })
    }, []);

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

    const handleClickSaveTransaction = (event) => {
        event.preventDefault();
        setIsLoading(true);
        // if (postId) {
            // PUT update
            editTransaction({
                Id: parseInt(transactionId),
                Title: transactionToEdit.title,
                Amount: transactionToEdit.content,
                TransactionDateTime: transactionToEdit.publishDateTime,
                CategoryId: parseInt(transactionToEdit.categoryId),
            })
            .then(() => history.push(`/transactions`))
        // } else {
        //     // debugger
        //     addPost({
        //         userProfileId: loggedInUserId,
        //         Title: postFormInput.title,
        //         Content: postFormInput.content,
        //         PublishDateTime: postFormInput.publishDateTime,
        //         ImageLocation: postFormInput.imageLocation,
        //         CategoryId: parseInt(postFormInput.categoryId),
        //         IsApproved: true
        //     })
        //     .then((parsedRes) => history.push(`/post/detail/${parsedRes.id}`))
        // }
    }

    return (
        <form className="transactionForm">
            <h2 className="transactionForm__title">Edit Transaction Category</h2>
            <h4 className="transactionForm__retailer">{transactionToEdit?.title}</h4>
            <fieldset className="col-6">
                <label htmlFor="category">Category:</label>
                <select
                    value={transactionToEdit?.categoryId}
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
            </fieldset>
            <div className="button-container">
                <button className="button btn btn-primary"
                    onClick={handleClickSaveTransaction} disable={isLoading.toString()}>
                    Save Transaction
                </button>
                <button className="button btn btn-sm btn-secondary" onClick={() => {history.push("/transactions")}}>Cancel</button>
            </div>
        </form>
    )
}