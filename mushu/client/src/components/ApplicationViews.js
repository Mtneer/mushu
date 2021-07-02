import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
// import { PostProvider } from "../providers/PostProvider";
import { TransactionList } from "./Transaction/TransactionList";
import { TransactionForm } from "./Transaction/TransactionForm";
import Login from "./Login";
// import Register from "./Register";
import Hello from "./Hello";
// import ConfirmDelete from "./ConfirmDelete";
// import { PostDetails } from "./PostDetails";
import { CategoryList } from "./Category/CategoryList";
import { CategoryForm } from "../components/Category/CategoryForm"

export default function ApplicationViews() {
  // import the isLoggedIn state variable from the UserProfileContext
  const { isLoggedIn } = useContext(UserProfileContext);


  return (
    <main>
      {/* Use a Switch to provide and handle different routing options within the App */}
      <Switch>
        {/* Define the Home path as "/". Use the isLoggedIn state variable to 
        manage what the user sees based on their login status. If they are logged in,
        display a welcome message. If not, redirect them to the login page*/}
        <Route path="/" exact>
          {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
        </Route>
        
        {/*-----------------TRANSACTION ROUTES--------------------*/}
        <Route exact path="/transactions">
          {isLoggedIn ? <TransactionList /> : <Redirect to="/login" />}
        </Route>
        
        {/* <Route exact path="/post/detail/:postId(\d+)">
          {isLoggedIn ? <PostDetails/> : <Redirect to="/login" />}
        </Route> */}
        
        {/* <Route exact path="/post/add">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route> */}
        
        <Route exact path="/transaction/edit/:transactionId(\d+)">
          {isLoggedIn ? <TransactionForm /> : <Redirect to="/login" />}
        </Route>

        {/* <Route exact path="/post/delete/:postId(\d+)">
          {isLoggedIn ? <ConfirmDelete /> : <Redirect to="/login" />}
        </Route> */}
        
       {/*-----------------CATEGORY ROUTES--------------------*/} 

        <Route exact path="/categories">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/categories/add">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        {/* <Route exact path="/categories/edit/:categoryId(\d+)">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route> */}

        {/*----------------Authentication Routes----------------- */}
        {/* Define the Login path as "/login". */}
        <Route path="/login">
          <Login />
        </Route>

        {/* Define the Register path as "/register". */}
        {/* <Route path="/register">
          <Register />
        </Route> */}
      </Switch>
    </main>
  );
};
