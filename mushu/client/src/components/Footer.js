import React from 'react';
import { Hero, Container, Content } from 'react-bulma-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faKey, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

export const Footer = () => {
    return (
      <div style={{ margin: '-1rem' }}>
        <Hero size="fullheight">
          <Hero.Header renderAs="header" />
          <Hero.Body />
          <Hero.Footer>
            <Footer>
              <Container>
                <Content style={{ textAlign: 'center' }}>
                  <p>
                    <strong>Mushu</strong> by{' '}
                    <a href="https://www.linkedin.com/in/david-billups/">David Billups</a>. The source code
                    is available on 
                    <a href="https://github.com/Mtneer/mushu">
                      {' '}
                      GitHub
                    </a>
                    . The icon originated from{' '}
                    <a href="https://www.freepik.com/vectors/animals">
                        Animals vector created by freepik - www.freepik.com
                    </a>
                    .
                  </p>
                </Content>
              </Container>
            </Footer>
          </Hero.Footer>
        </Hero>
      </div>
    );
  }