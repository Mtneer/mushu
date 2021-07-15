import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../../providers/CategoryProvider";
import { Heading, Container, Block, Box, Table, Button, Icon } from "react-bulma-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import TableScrollbar from 'react-table-scrollbar';

export const CategoryList=() => {
  const history = useHistory();
  const { categories, getAllCategories } = useContext(CategoryContext);
  
  const columns = ["#", "Name", " "]

  useEffect(() => {
    getAllCategories();
  }, []);

  const onClickEdit = (e) => {
    history.push(`/categories/edit/${e.currentTarget.id}`);
  }
  
  const onClickDelete = (e) => {
    history.push(`/categories/delete/${e.currentTarget.id}`);
  }

  return (
    <Container>
      <Box>
        <Block className="component-header">
          <Heading size={9}>Categories</Heading>
          <div>
            <Button onClick={() => history.push("/categories/add")}>
                <Icon>
                  <FontAwesomeIcon icon={faPlus} />
                </Icon>
                <span>Add New</span>
            </Button>
          </div>
        </Block>
        <Block className="table-container">
          <TableScrollbar>
          <Table>
              <thead>
                <tr>
                  {columns.map((col, index) => (
                    <th key={index}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {categories.sort((a, b) => a.name.localeCompare(b.name)).map((c, i) => {
                    return (
                    <tr key={c.id}>
                      <td>{i+1}</td>
                      <td>{c.name}</td>
                      <td>
                          <Button id={c.id} onClick={onClickEdit}>
                              <Icon>
                                <FontAwesomeIcon icon={faEdit} />
                              </Icon>
                          </Button>
                          {c.isUsed ? <></> 
                            : 
                            <Button id={c.id} onClick={onClickDelete}>
                                <Icon>
                                  <FontAwesomeIcon icon={faTrash} />
                                </Icon>
                            </Button>}
                      </td>
                    </tr>
                  )})}
              </tbody>
          </Table>
          </TableScrollbar>
        </Block>
      </Box>
    </Container>

  );
}