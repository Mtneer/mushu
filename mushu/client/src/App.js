import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TransactionProvider } from "./providers/TransactionProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <TransactionProvider>
                <Header />
                <ApplicationViews />     
        </TransactionProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
