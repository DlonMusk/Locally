import react, { useState } from "react";
const tabs = [
	{ name: "Products", href: "#", current: false },
	{ name: "Reviews", href: "#", current: false },
	{ name: "Posts", href: "#", current: true },
];
// update the tab to change from current false to current true

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function ProfileTabs() {
	return (
		<div>
			<div className="sm:hidden">
				<label htmlFor="tabs" className="sr-only">
					Select a tab
				</label>
				{/* Use an "onChange" listener to redirect the user to the selected tab URL. */}

				<select
					id="tabs"
					name="tabs"
					className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
					defaultValue={tabs.find((tab) => tab.current).name}
					// change tab to be current selected tab
					onChange={(e) => {
						const tab = tabs.find((tab) => tab.name === e.target.value);
						tab.current = true;
					}}
				>
					{tabs.map((tab) => (
						<option key={tab.name}>{tab.name}</option>
					))}
				</select>
			</div>
			<div className="hidden sm:block">
				<div className="border-b border-gray-200">
					<nav className="-mb-px flex" aria-label="Tabs">
						{tabs.map((tab) => (
							<a
								key={tab.name}
								href={tab.href}
								className={classNames(
									tab.current
										? "border-indigo-500 text-indigo-600"
										: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
									"w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm"
								)}
								aria-current={tab.current ? "page" : undefined}
							>
								{tab.name}
							</a>
						))}
					</nav>
				</div>
			</div>
		</div>
	);
}
