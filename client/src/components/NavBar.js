// Will add code here later
import React from "react";
import { useLocation } from "react-router-dom";

const Navigation = () => {
	const location = useLocation();

	console.log(location.pathname);

	const navItems = [
		{
			name: "Header",
			path: "/",
		},
		{
			name: "Store",
			path: "/store",
		},
	];

	return (
		<nav>
			{navItems.map((item) => (
				<a
					className={location.pathname === item.path ? "underline" : ""}
					key={item.name}
					href={item.path}
				>
					{item.name}
				</a>
			))}
		</nav>
	);
};

export default Navigation;
