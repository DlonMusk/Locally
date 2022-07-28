import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
// import Home from "./components/Home";
// import Store from "./components/Store";
import Products from "./components/Products";

function App() {
	return (
		<>
			<Header />
			<Products />
			<Footer />
		</>
	);
}

export default App;
