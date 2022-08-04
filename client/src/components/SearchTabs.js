import Home from "./Home";
export default function SearchTabs(props) {
	

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
