import React, { useContext, useState, useEffect } from "react";
import {useParams, useHistory } from "react-router-dom";
import { CategoryContext } from '../../providers/CategoryProvider';
import { Box, Form, Button, Icon } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faBan } from "@fortawesome/free-solid-svg-icons";

export const ConfirmDeleteCategory = () => {
    const { getCategoryById, deleteCategory } = useContext(CategoryContext);
    const { categoryId } = useParams();
    const [ category, setCategory ] = useState({});
    const history = useHistory();

    useEffect(() => {
        getCategoryById(categoryId)
        .then(setCategory);
    }, [])

    const onClickConfirm = () => {
        deleteCategory(categoryId); 
        history.push("/categories");
    }

    return (
      <Box>
        <form>
          <Form.Field>
            <Form.Label>
              <h3>{`Are you sure you want to delete the ${category.name} category?`}</h3>
            </Form.Label>
            <Button.Group align='center'>
              <Button onClick={onClickConfirm}>
                  <Icon>
                    <FontAwesomeIcon icon={faCheck} />
                  </Icon>
                  <span>Confirm</span>
              </Button>
              <Button onClick={() => {history.push("/categories")}}>
                  <Icon>
                    <FontAwesomeIcon icon={faBan} />
                  </Icon>
                  <span>Cancel</span>
              </Button>
            </Button.Group>
          </Form.Field>
        </form>
      </Box>
    );
  }
  
  export default ConfirmDeleteCategory;