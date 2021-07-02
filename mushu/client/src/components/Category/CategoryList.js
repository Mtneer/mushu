import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import {Category } from "./Category";
import { CategoryContext } from "../../providers/CategoryProvider";

import { Button } from "reactstrap";

export const CategoryList=() => {
  const history = useHistory();
  const { categories, getAllCategories } = useContext(CategoryContext);
  
  const columns = ["#", "Name"]

  useEffect(() => {
    getAllCategories();
  }, []);

  const onClickEdit = (e) => {
    history.push(`/categories/edit/${e.target.id}`);
  }
  
  const onClickDelete = (e) => {
    history.push(`/categories/delete/${e.target.id}`);
  }

  return (
    <div className="container">

      <div><Button onClick={() => history.push("/categories/add")}>Create Category</Button></div>
      <div className="row justify-content-center">
        <table>
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
                    {/* <td><button id={c.id} onClick={onClickEdit}>Edit</button></td> */}
                    {c.isUsed ? <></> : <td><button id={c.id} onClick={onClickDelete}>Delete</button></td>}
                  </tr>
                )})}
            </tbody>
        </table>
      </div>
    </div>

  );
}