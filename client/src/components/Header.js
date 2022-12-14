import React, { Fragment, useState, useContext, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import { UserContext } from "../contexts/UserContext";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {

	const location = useLocation();

	// Setting state and their values
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showSearch, setShowSearch] = useState(true);

  // Destructuring the useContext with the UserContext passed in
	const { user, setSearchState, searchState } = useContext(UserContext);

	


	// If the app is on the home page, show the search bar, if its anywhere else, hide it
	useEffect(() => {
		if (location.pathname === "/") {
			setShowSearch(true);
		} else {
			setShowSearch(false);
		}
	}, [location.pathname]);

	const handleChange = (event) => {
		const search = event.target.value;
			setSearchState(search);
	};

	useEffect(() => {
		console.log("user", user);
		if (user && user.me && user.me._id) {
			setIsLoggedIn(true);
		}
	}, [user]);

	const navigationItems = [
		{
			name: "Home",
			path: "/",
		},
	];


	const activeNavStyle =
		"border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";

	const inactiveNavStyle =
		"border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";

	return (
		<Disclosure as="nav" className="bg-white shadow">
			{({ open }) => (
				<>
					<div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
						<div className="flex justify-between h-16">
							<div className="flex px-2 lg:px-0">
								<div className="flex-shrink-0 flex items-center">
									<h1 className="text-3xl font-bold">Locally</h1>
								</div>
								<div className="hidden lg:ml-6 lg:flex lg:space-x-8">
									{navigationItems.map(({ name, path }) => (
										<a
											key={name}
											href={path}
											className={
												location.pathname === path
													? activeNavStyle
													: inactiveNavStyle
											}
										>
											{name}
										</a>
									))}
								</div>
							</div>
							{showSearch && (
								<div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
									<div className="max-w-lg w-full lg:max-w-xs">
										<label htmlFor="search" className="sr-only">
											Search
										</label>
										<div className="relative">
											<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
												<SearchIcon
													className="h-5 w-5 text-gray-400"
													aria-hidden="true"
												/>
											</div>
											<input
												id="search"
												name="search"
												className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												placeholder="Search"
												type="search"
												onChange={handleChange}
											/>
										</div>
									</div>
								</div>
							)}

							{!isLoggedIn && (
								<a
									href="/login"
									className="cursor-pointer border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								>
									Log in
								</a>
							)}

							<div className="flex items-center lg:hidden">
								{/* Mobile menu button */}
								<Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-6 w-6" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-6 w-6" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							{isLoggedIn && (
								<div className="hidden lg:ml-4 lg:flex lg:items-center">
									<Menu
										as="div"
										className={`ml-4 relative flex-shrink-0 ${
											isLoggedIn ? "block" : "hidden"
										}`}
									>
										<div>
											<Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
												<span className="sr-only">Open user menu</span>
												<img
													className="h-8 w-8 rounded-full"
													src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
													alt=""
												/>
											</Menu.Button>
										</div>
										<Transition
											as={Fragment}
											enter="transition ease-out duration-100"
											enterFrom="transform opacity-0 scale-95"
											enterTo="transform opacity-100 scale-100"
											leave="transition ease-in duration-75"
											leaveFrom="transform opacity-100 scale-100"
											leaveTo="transform opacity-0 scale-95"
										>
											<Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
												<Menu.Item>
													{({ active }) => (
														<a
															href={`/profile/${user.me._id}`}
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Your Profile
														</a>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<a
															onClick={Auth.logout}
															href="/login"
															className={classNames(
																active ? "bg-gray-100" : "",
																"block px-4 py-2 text-sm text-gray-700"
															)}
														>
															Sign out
														</a>
													)}
												</Menu.Item>
											</Menu.Items>
										</Transition>
									</Menu>
								</div>
							)}
						</div>
					</div>

					<Disclosure.Panel className="lg:hidden">
						<div className="pt-2 pb-3 space-y-1">
							{/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800" */}
							<Disclosure.Button
								as="a"
								href="/"
								className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
							>
								Home
							</Disclosure.Button>
						</div>
						<div
							className={`pt-4 pb-3 border-t border-gray-200 ${
								isLoggedIn ? "block" : "hidden"
							}`}
						>
							<div className="flex items-center px-4">
								<div className="flex-shrink-0">
									{/*  This is the User Menu on mobile*/}
									<img
										className="h-10 w-10 rounded-full"
										src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										alt=""
									/>
								</div>
								{isLoggedIn ?
								<div className="ml-3">
									<div className="text-base font-medium text-gray-800">
										{user.me.username}
									</div>
									<div className="text-sm font-medium text-gray-500">
										{user.me.email}
									</div>
								</div>
								: ""}
							</div>
							{isLoggedIn ?
							<div className="mt-3 space-y-1">
							<Disclosure.Button
								as="a"
								href={`/profile/${user.me._id}`}
								className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
							>
								Your Profile
							</Disclosure.Button>
							<Disclosure.Button
								as="a"
								onClick={Auth.logout}
								href="/login"
								className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
							>
								Sign out
							</Disclosure.Button>
						</div>
							: ""}
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
}
