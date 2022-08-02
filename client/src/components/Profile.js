import {
	MailIcon,
	PhoneIcon,
	PencilIcon,
	ViewGridAddIcon,
} from "@heroicons/react/solid";
import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_GET_USER_STORE_PROFILE, QUERY_GET_USER } from "../utils/queries";
import { Dialog, Transition } from "@headlessui/react";
import { useLocation, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
// import helper from "../utils/helpers";

import FormStore from "./FormStore";
import Modal from "./Modal";
import FormProduct from "./FormProduct";
import ProfileTabs from "./ProfileTabs";
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
	const { user } = useContext(UserContext);
	let { profileId } = useParams();

	const [showStoreForm, setShowStoreForm] = useState(false);
	const [showProductForm, setShowProductForm] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [isMe, setIsMe] = useState(false);
	const [hasStore, setHasStore] = useState(false);
	const [storeData, setStoreData] = useState({});
	const [storeId, setStoreId] = useState("");

	useEffect(() => {
		if (user) {
			if (user.me._id == profileId) {
				setIsMe(true);
			}
		}
	}, [user, profileId]);

	const [getUserStore, { loading, data, error }] = useLazyQuery(
		QUERY_GET_USER_STORE_PROFILE,
		{
			variables: { id: storeId },
		}
	);

	const {
		loading: userQueryLoad,
		data: userQueryData,
		error: userQueryError,
	} = useQuery(QUERY_GET_USER, { variables: { id: profileId } });

	useEffect(() => {
		if (storeId) {
			console.log("storeId", storeId);
			getUserStore({ variables: { id: storeId } });
		}
	}, [storeId, getUserStore]);

	useEffect(() => {
		if (userQueryData && userQueryData.getUser && userQueryData.getUser.store) {
			setStoreId(userQueryData.getUser.store._id);
		}
	}, [userQueryData, userQueryError, userQueryLoad]);

	useEffect(() => {
		if (!data && !loading) {
			setHasStore(false);
			return;
		}
		if (data && data?.getStore) {
			setStoreData(data.getStore);
		}
		setHasStore(true);
	}, [data, error, loading, userQueryData]);
	/////////////////////

	let tabIndex = 0;

	let disableValue = false;

	// console.log("Product value check-----------------");
	// console.log(storeData.products);

	let storeItems = storeData.products;
	// console.log(storeItems);

    let storeEmailHref = "mailto:"+storeData.email

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
									{storeData.storeTitle}
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

									<a href={`mailto:${storeData.email}`}>Email: {storeData.email}</a>
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
								{isMe && hasStore ? (
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
								) : (
									""
								)}
								{isMe && !hasStore ? (
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
								) : (
									""
								)}
							</div>
						</div>
					</div>
					{storeCheck()}
				</div>
			</div>
			<ProfileTabs
				hasStore={hasStore}
				isMe={isMe}
				setShowStoreForm={setShowStoreForm}
				setShowModal={setShowModal}
				storeId={storeId}
			/>
		</>
	);
}
