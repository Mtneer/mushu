import React, { useState, useContext, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Box, Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

export const CategoryForm = () => {
  
    const history = useHistory();
    //exposing the addCategory function from the CategoryProdiver
    const { addCategory, getCategoryById, editCategory } = useContext(CategoryContext);
    // setting categroryText to an empty state so we can add in the new category information
    const [categoryFormInput, setCategoryFormInput] = useState();

    const {categoryId} = useParams();

    // wait for data before burron is active
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
        if (categoryId) {
            getCategoryById(categoryId)
            .then(category => {
                setCategoryFormInput(category)
                setIsLoading(false)
            })
        }
    },[])
  
  
    //when a field changes, update state. The return will re-render and display based on the values in state
    //controlled component
    const handleControlledInputChange = (event) => {
        //creating a copy of state to change and then set, using spread syntax to copy an object
        let newCategory = { ...categoryFormInput }
        //category is an object with properties , set the property to the new value using obejct bracket notation
        newCategory[event.target.id] = event.target.value
        //update state
        setCategoryFormInput(newCategory)
    }
  
    const handleClickSaveCategory = (event) => {
        event.preventDefault();
        setIsLoading(true);
        if (categoryId) {
            // PUT update
            editCategory({
                Id: parseInt(categoryId),
                Name: categoryFormInput.name,
            })
            .then(() => history.push(`/categories`))
        } else {
            addCategory({
                Name: categoryFormInput.name,
            })
            .then(() => history.push(`/categories`))
        }
    }
  
    return (
        <Box>
            <form className="categoryForm">
            <h2 className="categoryForm__title">{(categoryId)? "Edit Category" : "Add Category"}</h2>
            <Form.Field>
                <Form.Label>Category Name:</Form.Label>
                <Form.Control>
                    <Form.Input 
                        type="text" 
                        id="name" 
                        onChange={handleControlledInputChange} required autoFocus 
                        placeholder="Category Name" 
                        value={categoryFormInput?.name} />
                </Form.Control>
            </Form.Field>
            <Form.Field kind="group">

                <Button 
                    onClick={handleClickSaveCategory}
                    disable={isLoading.toString()}>
                    {categoryId ? <>Save Category</>:<>Add Category</>}
                </Button>
                <Button 
                    onClick={() => {history.push("/categories")}}>
                    Cancel
                </Button>
            </Form.Field>
            </form>
        </Box>
    );
}