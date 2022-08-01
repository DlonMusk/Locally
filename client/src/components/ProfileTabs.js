import react, { useState } from "react";
import Reviews from "./Reviews";
import Products from "./ProductList";
import Posts from "./Posts";
import { PlusIcon } from "@heroicons/react/solid";

// update the tab to change from current false to current true

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ProfileTabs(props) {
	const [tabs, setTabs] = useState([
		{ name: "Products" },
		{ name: "Reviews" },
		{ name: "Posts" },
	]);

	const [selectedTab, setSelectedTab] = useState(tabs[0].name);

	if (!props.hasStore) {
		return (
			<div className="text-center">
				<svg
					className="mx-auto h-12 w-12 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-hidden="true"
				>
					<path
						vectorEffect="non-scaling-stroke"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
					/>
				</svg>
				<h3 className="mt-2 text-sm font-medium text-gray-900">No store</h3>
				<p className="mt-1 text-sm text-gray-500">
					{props.isMe
						? "Get started by creating a new store."
						: "This user currently has no store"}
				</p>
				<div className="mt-6">
					{props.isMe ? (
						<button
							onClick={() => {
								props.setShowStoreForm(true);
								props.setShowModal(true);
							}}
							type="button"
							className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							<PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
							Create Your Store
						</button>
					) : (
						""
					)}
				</div>
			</div>
		);
	}

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
			{selectedTab === "Products" && <Products storeId={props.storeId} />}
			{selectedTab === "Reviews" && <Reviews />}
			{selectedTab === "Posts" && <Posts />}
		</>
	);
}
