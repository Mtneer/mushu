import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TransactionProvider } from "./providers/TransactionProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <TransactionProvider>
          <CategoryProvider>
                <Header />
                <ApplicationViews />     
          </CategoryProvider>
        </TransactionProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
