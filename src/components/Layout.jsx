import React from 'react';
import { Header, Sidebar, Dashboard } from '.';
import { Container, Row, Col } from 'react-bootstrap'

const Layout = ({ children }) => {
    return (
        <React.Fragment>
            <Dashboard />
        </React.Fragment>
    );
};

export default Layout