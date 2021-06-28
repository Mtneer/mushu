import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import { PostProvider } from "../providers/PostProvider";
import { PostTagProvider } from "../providers/PostTagProvider";
import { PostList } from "./PostList";
import { PostForm } from "./PostForm";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello";
import MyPosts from "./MyPosts";
import ConfirmDelete from "./ConfirmDelete";
import { PostDetails } from "./PostDetails";
import {TagList} from "../components/tag/TagList"
import {TagForm} from "../components/tag/TagForm"
import ConfirmTagDelete from "./tag/ConfirmTagDelete"
import { CategoryList } from "../components/Category/CategoryList"
import { CategoryForm } from "../components/Category/CategoryForm"
import { ConfirmDeleteCategory } from "../components/Category/ConfirmDeleteCategory"

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
        
        {/*-----------------POST ROUTES--------------------*/}
        <Route exact path="/post">
          {isLoggedIn ? <PostList /> : <Redirect to="/login" />}
        </Route>

        {/* Define the MyPosts path as "/myposts". Use the isLoggedIn state variable to 
        manage what the user sees based on their login status. If they are logged in,
        display their posts. If not, redirect them to the login page*/}
        <Route path="/myposts" exact>
          {isLoggedIn ? <MyPosts /> : <Redirect to="/login" />}
        </Route>
        
        <Route exact path="/post/detail/:postId(\d+)">
          {isLoggedIn ? <PostDetails/> : <Redirect to="/login" />}
        </Route>
        
        <Route exact path="/post/add">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>
        
        <Route exact path="/post/edit/:postId(\d+)">
          {isLoggedIn ? <PostForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/post/delete/:postId(\d+)">
          {isLoggedIn ? <ConfirmDelete /> : <Redirect to="/login" />}
        </Route>
        
        {/*-----------------TAG ROUTES--------------------*/}

        <Route exact path="/tags">
          {isLoggedIn ? <TagList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/tag/delete/:tagId">
          {isLoggedIn ? <ConfirmTagDelete /> : <Redirect to="/login" />}
        </Route>

        
        <Route exact path="/tags/add">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/tag/edit/:tagId(\d+)">
          {isLoggedIn ? <TagForm /> : <Redirect to="/login" />}
        </Route>

        
        

       {/*-----------------CATEGORY ROUTES--------------------*/} 

        <Route exact path="/categories">
          {isLoggedIn ? <CategoryList /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/categories/add">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/categories/edit/:categoryId(\d+)">
          {isLoggedIn ? <CategoryForm /> : <Redirect to="/login" />}
        </Route>

        <Route exact path="/categories/delete/:categoryId">
          {isLoggedIn ? <ConfirmDeleteCategory /> : <Redirect to="/login" />}
        </Route>

        {/*----------------Authentication Routes----------------- */}
        {/* Define the Login path as "/login". */}
        <Route path="/login">
          <Login />
        </Route>

        {/* Define the Register path as "/register". */}
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
};
