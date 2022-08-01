import React, { createContext, useState } from "react";
import { QUERY_GET_USER } from "../utils/queries";

const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	return (
		<UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
	);
};

export { UserContext, UserProvider };
