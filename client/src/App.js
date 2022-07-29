import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Home from "./components/Home";
// import Store from "./components/Store";
import Products from "./components/Products";
import ProductList from "./components/ProductList";
import LoginForm from "./components/Auth/LoginForm";
import SignupForm from "./components/Auth/SignupForm";
import AuthLayout from "./components/Auth/Layout";
import ProfileLayout from "./components/Profile";
import Signup from "./components/Auth/SignupForm";

const Home = () => {
	return (
		<>
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
			<ProfileLayout />
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

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="store" element={<Store />} />
				<Route path="login" element={<Login />} />
				<Route path="signup" element={<SignUp />} />
				<Route path="profile" element={<Profile />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;