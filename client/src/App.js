import "./App.css";
import React, { useState, useEffect } from "react";
import {
	useLazyQuery,
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
	useQuery,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeList from "./components/Home";
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
import { UserProvider } from "./contexts/UserContext";
import { SearchProvider } from "./contexts/SearchContext";
import { QUERY_GET_PRODUCTS } from "./utils/queries";

// Constructing an http link, assigning uri to the URL of the GraphQL endpoint to send requests to
const httpLink = createHttpLink({
	uri: "/graphql",
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
			<Header />
			<ProductListing />
		</>
	);
};

const Home = () => {
	const [search, setSearch] = useState("");
	const [tag, setTag] = useState("All");

	const {
		loading: searchLoad,
		error: searchError,
		data: searchData,
	} = useQuery(QUERY_GET_PRODUCTS, {
		variables: {
			searchName: search,
			tagState: tag,
			searchData: "searchData",
		},
	});

	return (
		<>
			<Header search={search} setSearch={setSearch} />
			<SearchTabs
				search={search}
				setTag={setTag}
				tag={tag}
				searchData={searchData?.getProducts}
			/>
		</>
	);
};

const Store = () => {
	return (
		<>
			<Header />
			<ProductList />
		</>
	);
};

const Profile = () => {
	return (
		<>
			<Header />
			<ProfileContainer />
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

const PageWrapper = ({ children }) => {
	return (
		<>
			<UserProvider>
				{children}
				<Footer />
			</UserProvider>
		</>
	);
};

function App() {
	return (
		<ApolloProvider client={client}>
			<Routes>
				<Route
					path="/"
					element={
						<PageWrapper>
							<Home />
						</PageWrapper>
					}
				/>
				<Route
					path="store"
					element={
						<PageWrapper>
							<Store />
						</PageWrapper>
					}
				/>
				<Route
					path="login"
					element={
						<PageWrapper>
							<Header />
							<Login />
						</PageWrapper>
					}
				/>
				<Route
					path="signup"
					element={
						<PageWrapper>
							<SignUp />
						</PageWrapper>
					}
				/>
				<Route
					path="profile/:profileId"
					element={
						<PageWrapper>
							<Profile />
						</PageWrapper>
					}
				/>
				<Route
					path="product/:productId"
					element={
						<PageWrapper>
							<Product />
						</PageWrapper>
					}
				/>
			</Routes>
		</ApolloProvider>
	);
}

export default App;
