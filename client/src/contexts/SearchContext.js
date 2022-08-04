import React, { createContext, useState } from "react";
import { QUERY_GET_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const SearchContext = createContext({});

const SearchProvider = ({ children }) => {
	const [searchState, setSearchState] = useState("");
	console.log("searchData", searchState);

	const [tagState, setTagState] = useState("All");

	const {
		loading: searchLoad,
		error: searchError,
		data: searchData,
	} = useQuery(QUERY_GET_PRODUCTS, {
		variables: { searchName: searchState, tagState: tagState },
	});

	return (
		<>
			<SearchContext.Provider
				value={{
					searchData,
					tagState,
					setTagState,
					searchState,
					setSearchState,
				}}
			>
				{children}
			</SearchContext.Provider>
		</>
	);
};

export { SearchContext, SearchProvider };
