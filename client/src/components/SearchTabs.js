import { useState } from "react";

export default function SearchTabs() {
    // I want to render each button and when the user clicks on the button it will set it to activaded or not
    // all you have to do is make a function that flips true false values on the tabs if the user clicks on that button
    // and have it associated with a state so the page will re render on change
    // to render this.... make a state array of the tag names ..... map over the array to display each button
    // 
    const selected = true;
    const tabs = [
        {
            tabName: 'Clothing',
        },
        {
            tabName: 'Food/Beverage',
        },
        {
            tabName: 'Art',
        },
        {
            tabName: 'Accessories',
        },
        {
            tabName: 'Entertainment',
        },
        {
            tabName: 'Home/Living',
        },
        {
            tabName: 'Odd Jobs',
        },

    ]

    const [tabState, setTabState] = useState(tabs)

    const [selectedTab, setSelectedTab] = useState(tabs[0].tabName)
    return (

        <div className="p-8 mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:items-center sm:space-y-0 sm:space-x-6">
            <div className="text-center space-x-10 pt-3 border-t-2">

                {tabState.map((tab) => (
                    <button onClick={() => setSelectedTab(tab.tabName)}
                            className={ selectedTab === tab.tabName
                            ? "px-4 py-1 text-sm font-semibold rounded-full border border-gray-300 bg-indigo-500 text-white border-transparent"
                            : "px-4 py-1 text-sm text-indigo-500 font-semibold rounded-full border border-gray-300 hover:bg-indigo-300 hover:text-white hover:border-transparent"
                            }
                    >
                        <span>{tab.tabName}</span>
                    </button>
                ))}


                {/* <button class="px-4 py-1 text-sm text-gray-600 font-semibold rounded-full border border-gray-300 hover:bg-yellow-200 hover:border-transparent">
                    <span>Food/Beverage</span>
                </button>

                <button class="px-4 py-1 text-sm text-gray-600 font-semibold rounded-full border border-gray-300 hover:bg-green-200 hover:border-transparent">
                    <span>Art</span>
                </button>

                <button class="px-4 py-1 text-sm text-gray-600 font-semibold rounded-full border border-gray-300 hover:bg-red-200 hover:border-transparent">
                    <span>Accessories</span>
                </button>

                <button class="px-4 py-1 text-sm text-gray-600 font-semibold rounded-full border border-gray-300 hover:bg-teal-200 hover:border-transparent">
                    <span>Entertainment</span>
                </button>

                <button class="px-4 py-1 text-sm text-gray-600 font-semibold rounded-full border border-gray-300 hover:bg-purple-200 hover:border-transparent">
                    <span>Home/Living</span>
                </button>

                <button class="px-4 py-1 text-sm text-gray-600 font-semibold rounded-full border border-gray-300 hover:bg-cyan-200 hover:border-transparent">
                    <span>Odd Jobs</span>
                </button> */}
            </div>
        </div>

    )

}