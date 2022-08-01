import "./App.css";
import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ProductList from "./components/ProductList";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import AuthLayout from "./components/Auth/Layout";
import ProfileContainer from "./components/Profile";
import SearchTabs from "./components/SearchTabs";
import Posts from "./components/Posts";
import Signup from "./components/Auth/SignupForm";
import ProfileTabs from "./components/ProfileTabs";
import ProductListing from "./components/ProductListing";

// Constructing an http link, assigning uri to the URL of the GraphQL endpoint to send requests to
const httpLink = createHttpLink({
	uri: "http://localhost:3001/graphql",
});

console.log("httpLink Is ----------");
console.log(httpLink);

const authLink = setContext((_, { headers }) => {
	// Getting the authentication token from local storage
	const token = localStorage.getItem("id_token");

	console.log("token is " + token);
	// Returning the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

// Creating a new ApolloClient (This is an Apollo Client constructor)
const client = new ApolloClient({
	// Chaining the HTTP link and the authorization link
	link: authLink.concat(httpLink),
	// Assigning cache to InMemoryCache object, this stores the results of its GraphQL queries in cache
	cache: new InMemoryCache(),
});


// ------------- PAGES ------------- //

const Product = () => {
	return (
		<>
			<ProductListing />
		</>
	);
};

const Home = () => {
	return (
		<>
			<SearchTabs />
			<ProductList />
		</>
	);
};

const Store = () => {
	return (
		<>
			<ProductList />
		</>
	);
};

const Profile = () => {
	return (
		<>
			<ProfileContainer />
			<ProfileTabs />
		</>
	);
};

const Login = () => {
	return (
		<>
			<AuthLayout>
				<LoginForm />
			</AuthLayout>
		</>
	);
};

const SignUp = () => {
	return (
		<>
			<AuthLayout>
				<SignupForm />
			</AuthLayout>
		</>
	);
};

// ------------- !PAGES ------------- //

function App() {
	return (
		<ApolloProvider client={client}>
			<>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="store" element={<Store />} />
					<Route path="login" element={<Login />} />
					<Route path="signup" element={<SignUp />} />
					<Route path="profile" element={<Profile />} />
					<Route path="product/:productId" element={<Product />} />
				</Routes>
				<Footer />
			</>
		</ApolloProvider>
	);
}

export default App;
