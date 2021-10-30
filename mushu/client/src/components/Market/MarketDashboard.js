import React, { useContext, useEffect, useState } from "react";
import { Heading, Container, Box, Table, Button, Icon, Form, Block } from "react-bulma-components";
import StockChart from "./StockChart";

export const MarketDashboard = () => {


    return (
        <Container>
            <Box>
                <Heading>Market Dashboard</Heading>
                <StockChart symbol = "TSLA"/>
            </Box>
        </Container>
    )
}