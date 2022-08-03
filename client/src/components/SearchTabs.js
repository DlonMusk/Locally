import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_PRODUCTS } from "../utils/queries";
import { UserContext } from "../contexts/UserContext";
import Home from "./Home";
export default function SearchTabs(props) {
	// I want to render each button and when the user clicks on the button it will set it to activated or not
	// all you have to do is make a function that flips true false values on the tabs if the user clicks on that button
	// and have it associated with a state so the page will re render on change
	// to render this.... make a state array of the tag names ..... map over the array to display each button
	//

	const tabs = [
		{
			tabName: "All",
		},
		{
			tabName: "Clothing",
		},
		{
			tabName: "Food/Beverage",
		},
		{
			tabName: "Art",
		},
		{
			tabName: "Accessories",
		},
		{
			tabName: "Entertainment",
		},
		{
			tabName: "Home/Living",
		},
		{
			tabName: "Odd Jobs",
		},
	];

	return (
		<>
			<div className="p-8 mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
				<div className="text-center space-x-10 pt-3 border-t-2">
					{tabs.map((tab) => (
						<button
							onClick={() => props.setTag(tab.tabName)}
							className={
								props.tag === tab.tabName
									? "px-4 py-1 text-sm font-semibold rounded-full border border-gray-300 bg-indigo-500 text-white border-transparent"
									: "px-4 py-1 text-sm text-indigo-500 font-semibold rounded-full border border-gray-300 hover:bg-indigo-300 hover:text-white hover:border-transparent"
							}
						>
							<span>{tab.tabName}</span>
						</button>
					))}
				</div>
			</div>
			<Home
				tagState={props.tagState}
				searchName={props.search || ""}
				searchData={props.searchData}
			/>
		</>
	);
}
