import React, { useContext, useState, useEffect } from "react";
import {useParams, useHistory } from "react-router-dom";
import { CategoryContext } from '../../providers/CategoryProvider';

export const ConfirmDelete = () => {
    const { getCategoryById, deleteCategory } = useContext(CategoryContext);
    const { categoryId } = useParams();
    const [ category, setCategory ] = useState({});
    const history = useHistory();

    useEffect(() => {
        getCategoryById(categoryId)
        .then(setCategory)
    })

    const onClickConfirm = () => {
        deleteCategory(categoryId); 
        history.push("/categories");
    }

    return (
        <div className="container">
          <div className="row justify-content-center">
            <h3>{`Are you sure you want to delete the ${category?.name} category?`}</h3>
          </div>
          <div className="row justify-content-center">
            <button onClick={onClickConfirm} className="button btn btn-sm btn-primary">
              Confirm
            </button>
            <button onClick={() => {history.push("/categories")}} className="button btn btn-sm btn-secondary">
                Cancel
            </button>
          </div>
      </div>
    );
  }
  
  export default ConfirmDelete;