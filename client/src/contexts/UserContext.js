import React, { createContext, useState, useEffect } from "react";
import { GET_ME, QUERY_GET_PRODUCTS } from "../utils/queries";
import { useQuery } from "@apollo/client";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [searchState, setSearchState] = useState("");

	const [tagState, setTagState] = useState("All");


	const { loading, error, data } = useQuery(GET_ME);

	const {
		loading: searchLoad,
		error: searchError,
		data: searchData,
	} = useQuery(QUERY_GET_PRODUCTS, {
		variables: { searchName: searchState, tagState: tagState },
	});


	return (
		<>
			<UserContext.Provider
				value={{
					searchData,
					tagState,
					setTagState,
					searchState,
					setSearchState,
					user: data,
					loading,
					error,
				}}
			>
				{children}
			</UserContext.Provider>
		</>
	);
};

export { UserContext, UserProvider };
