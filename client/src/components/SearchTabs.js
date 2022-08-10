import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
export default function SearchTabs() {

	
	const { tagState, setTagState } = useContext(UserContext);
	

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
			<div className="p-8 bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 py-0">
				<div className="text-center sm:space-x-10 pt-3 border-t-2">
					{tabs.map((tab) => (
						<button
							onClick={() => setTagState(tab.tabName)}
							key={tab.tabName}
							className={
								tagState === tab.tabName
									? "px-4 py-1 text-sm font-semibold rounded-full border border-gray-300 bg-indigo-500 text-white border-transparent"
									: "px-4 py-1 text-sm text-indigo-500 font-semibold rounded-full border border-gray-300 hover:bg-indigo-300 hover:text-white hover:border-transparent"
							}
						>
							<span>{tab.tabName}</span>
						</button>
					))}
				</div>
			</div>
		</>
	);
}