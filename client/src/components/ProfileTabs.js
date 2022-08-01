import react, { useState } from "react";
import Reviews from "./Reviews";
import Products from "./ProductList";
import Posts from "./Posts";

// update the tab to change from current false to current true

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ProfileTabs() {
	const [tabs, setTabs] = useState([
		{ name: "Products" },
		{ name: "Reviews" },
		{ name: "Posts" },
	]);

	const [selectedTab, setSelectedTab] = useState(tabs[0].name);

	return (
		<>
			<div className="border-b border-gray-200">
				<nav className="-mb-px flex" aria-label="Tabs">
					{tabs.map((tab) => (
						<span
							onClick={(selectedTab) => {
								setSelectedTab(tab.name);
							}}
							key={tab.name}
							className={classNames(
								selectedTab === tab.name
									? " cursor-pointer border-indigo-500 text-indigo-600"
									: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
								"w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm"
							)}
							aria-current={tab.name ? "page" : undefined}
						>
							{tab.name}
						</span>
					))}
				</nav>
			</div>
			{selectedTab === "Products" && <Products />}
			{selectedTab === "Reviews" && <Reviews />}
			{selectedTab === "Posts" && <Posts />}
		</>
	);
}
