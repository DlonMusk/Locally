import {
	MailIcon,
	PhoneIcon,
	PencilIcon,
	ViewGridAddIcon,
} from "@heroicons/react/solid";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_STORE_PROFILE, QUERY_GET_USER } from "../utils/queries";
import { Dialog, Transition } from "@headlessui/react";

// import helper from "../utils/helpers";

import Products from "./ProductList";
import Posts from "./Posts";
import Reviews from "./Reviews";
import FormStore from "./FormStore";
import Modal from "./Modal";
import FormProduct from "./FormProduct";
// Rabias stuff

const profile = {
	name: "John Doe",
	email: "John.Doe@example.com",
	avatar: "https://source.unsplash.com/random/400x400",
	backgroundImage:
		"https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
	fields: [
		["Phone", "(647) 123-4567"],
		["Email", "John.Doe@example.com"],
		["Title", "Senior Front-End Developer"],
		["Team", "Product Development"],
		["Location", "Toronto, ON"],
		["Sits", "UofT, 4th floor"],
		["Salary", "$145,000"],
		["Birthday", "June 8, 1990"],
	],
};

export default function ProfileContainer() {
	const [showStoreForm, setShowStoreForm] = useState(false);
	const [showProductForm, setShowProductForm] = useState(false);
	const [showModal, setShowModal] = useState(false);


    const testingID = "62e5b6e4820df4975ed9ce2f";
    const testingID2 = "62e595024f09121c389aef19";

    const { loading, data, error } = useQuery(QUERY_GET_USER_STORE_PROFILE, {variables: { id: testingID},});
    const {loading: userQueryLoad, data: userQueryData, error: userQueryError} = useQuery(QUERY_GET_USER, {variables: { id: testingID2},});

    console.log("Data is---------------------");
    console.log(data)
    console.log("loading is " + loading);
    console.log("error is--------------------")
    console.log(error)

    console.log("userQueryData is---------------------");
    console.log(userQueryData)
    console.log("userQueryLoad is " + userQueryLoad);
    console.log("userQueryError is--------------------")
    console.log(userQueryError)



    const storeData = data?.getStore || {"Didnt Get": "The Data"};
    console.log(storeData);

    const userData = userQueryData?.getUser || {"Didnt Get": "The Data"};
    console.log(userData);



    /////////////////////

    let tabIndex = 0

    let disableValue = false;

    console.log("Product value check-----------------");
    console.log(storeData.products);

    let storeItems = storeData.products
    console.log(storeItems)

    const storeCheck = () => {
        if (storeItems !== undefined) {
            tabIndex = 0;
            disableValue = false;
        }
        tabIndex = 1;
        disableValue = true;
    };


	return (
		<>
			<Modal
				isOpen={showModal}
				title={`Create new ${showProductForm ? "Product" : "Store"}`}
				onClose={() => {
					setShowModal(false);
					setShowProductForm(false);
					setShowStoreForm(false);
				}}
			>
				{showStoreForm && (
					<FormStore
						onCancel={() => {
							setShowModal(false);
							setShowStoreForm(false);
						}}
					/>
				)}
				{showProductForm && (
					<FormProduct
						onCancel={() => {
							setShowModal(false);
							setShowProductForm(false);
						}}
					/>
				)}
			</Modal>
			<div className="profileContainer">
				<div>
					<img
						className="h-32 w-full object-cover lg:h-48"
						src={profile.backgroundImage}
						alt=""
					/>
				</div>
				<div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
						<div className="flex">
							<img
								className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
								src={profile.avatar}
								alt=""
							/>
						</div>
						<div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
							<div className="sm:hidden md:block mt-6 min-w-0 flex-1">
								<h1 className="text-2xl font-bold text-gray-900 truncate">
									{userData.username}
								</h1>
							</div>
							<div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
								<button
									type="button"
									className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
								>
									<MailIcon
										className="-ml-1 mr-2 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>

									<span>Email: {storeData.email}</span>
								</button>
								<button
									type="button"
									className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
								>
									<PhoneIcon
										className="-ml-1 mr-2 h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>

									<span>Call: {storeData.phoneNumber}</span>
								</button>
								<button
									type="button"
									onClick={() => {
										setShowProductForm(!showProductForm);
										setShowModal(!showModal);
									}}
									className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									<ViewGridAddIcon
										className="-ml-1 mr-2 h-5 w-5 text-gray-500"
										aria-hidden="true"
									/>
									Add Product
								</button>
								<button
									type="button"
									className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									onClick={() => {
										setShowStoreForm(!showStoreForm);
										setShowModal(!showModal);
									}}
								>
									Create Store
								</button>
							</div>
						</div>
					</div>

					{/* <h2> Username: {userData[0].username}</h2>

                <h2> Address: {userData[1].address}</h2>
                <h2> Email: {userData[1].email}</h2>
                <h2> Phone Number: {userData[1].phoneNumber}</h2>
                <h2> Tags: {userData[1].tags}</h2>
                 */}
					{storeCheck()}
					{/* <Tabs isLazy defaultIndex={tabIndex}>
				<TabList>
					<Tab isDisabled={disableValue} as={Link} to="/products">
						Products
					</Tab>
					<Tab as={Link} to="/posts">
						Posts
					</Tab>
					<Tab as={Link} to="/reviews">
						Reviews
					</Tab>
				</TabList> */}
					{/* initially mounted */}
					{/* <TabPanels>
		
					<TabPanel>
						<Routes>
							<Route path="/products" element={<Products />} />
						</Routes>
					</TabPanel> */}
					{/* initially not mounted */}
					{/* <TabPanel>
						<Routes>
							<Route path="/posts" element={<Posts />} />
						</Routes>
					</TabPanel>
					<TabPanel>
						<Routes>
							<Route path="/reviews" element={<Reviews />} />
						</Routes>
					</TabPanel>
				</TabPanels>
			</Tabs> */}
					{/* <Routes>
				<Route path="*" element={<h1>Page routing error</h1>} />
			</Routes> */}
				</div>
			</div>
		</>
	);
}
