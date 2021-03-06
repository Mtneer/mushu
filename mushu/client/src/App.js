import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import { TransactionProvider } from "./providers/TransactionProvider";
import { CategoryProvider } from "./providers/CategoryProvider";
import { BudgetProvider } from "./providers/BudgetProvider";
import { AccountProvider } from "./providers/AccountProvider";
import { SpendingProvider } from "./providers/SpendingProvider";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import ApplicationViews from "./components/ApplicationViews";
import 'bulma/css/bulma.min.css';
import { Hero } from 'react-bulma-components';


function App() {
  return (
    <Router>
      <UserProfileProvider>
        <TransactionProvider>
          <CategoryProvider>
            <BudgetProvider>
              <AccountProvider>
                <SpendingProvider>
                  {/* <div style={{ margin: '-1rem' }}>
                    <Hero size="fullheight">
                      <Hero.Header renderAs="header"> */}
                        <Header />
                      {/* </Hero.Header>
                      <Hero.Body> */}
                        <ApplicationViews /> 
                      {/* </Hero.Body>
                      <Hero.Footer> */}
                        <Footer />
                      {/* </Hero.Footer>
                    </Hero>
                  </div> */}
                </SpendingProvider>
              </AccountProvider>
            </BudgetProvider>
          </CategoryProvider>
        </TransactionProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;
