import React, { createContext, useState, useEffect } from "react";
import { GET_ME } from "../utils/queries";
import { useQuery } from "@apollo/client";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const { loading, error, data } = useQuery(GET_ME);

	return (
		<>
			<UserContext.Provider value={{ user: data, loading, error }}>
				{children}
			</UserContext.Provider>
		</>
	);
};

export { UserContext, UserProvider };
