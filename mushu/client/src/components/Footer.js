import React from 'react';
import { Container, Content } from 'react-bulma-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSignOutAlt, faKey, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';

export const Footer = () => {
    return (
      <div className="custom-footer">
        <Container>
          <Content style={{ textAlign: 'center' }}>
            <p>
              <strong>mushu</strong> by{' '}
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
      </div>
    );
  }