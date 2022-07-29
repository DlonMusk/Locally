// Will add code here later
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
// import helper from "../utils/helpers";

import Products from './Products';
import Posts from './Posts';
import Reviews from './Reviews';



export default function Profile() {

    const [userData, setUserData] = useState([
        // This object will come from the base User that is grabbed
        {
            username: "Guy",
        },
        // This object will come from the Store child for the user
        {
            address: "16 Rad St",
            email: "Rad@Cool.com",
            phoneNumber: "555-222-8000",
            tags: ["fun", "art"],
        }
	]);

	// useEffect(() => {
    //     // Will add code later to populate userData with actual database info later
	// }, []);

    let tabIndex = 0

    let disableValue = false;

    const hasStore = null //Need to add ? : code to use a helper I will work on later

    const storeCheck = () => {
        if (!hasStore) {
            tabIndex = 1;
            disableValue = true;
        }
        tabIndex = 0;
        disableValue = false;
    };

    return (
        <Routes>
            <div className="profileContainer">

                <h2> Username: {userData[0].username}</h2>
                <h2> Address: {userData[1].address}</h2>
                <h2> Email: {userData[1].email}</h2>
                <h2> Phone Number: {userData[1].phoneNumber}</h2>
                <h2> Tags: {userData[1].tags}</h2>
                
                {storeCheck()}
                <Tabs isLazy defaultIndex={tabIndex}>
                    <TabList>
                        <Tab isDisabled={disableValue} as={Link} to='/products'>Products</Tab>
                        <Tab as={Link} to='/posts'>Posts</Tab>
                        <Tab as={Link} to='/reviews'>Reviews</Tab>
                    </TabList>

                    <TabPanels>

                        {/* initially mounted */}
                        <TabPanel>
                            <Route
                                path="/products"
                                element={<Products />}
                            />
                        </TabPanel>
                        {/* initially not mounted */}
                        <TabPanel>
                            <Route
                                path="/posts"
                                element={<Posts />}
                            />
                        </TabPanel>
                        <TabPanel>
                            <Route
                                path="/reviews"
                                element={<Reviews />}
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>

                <Route
                    path="*"
                    element={<h1>Page routing error</h1>}
                />

            </div>
        </Routes>
    );
};








