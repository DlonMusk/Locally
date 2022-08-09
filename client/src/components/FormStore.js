import { ADD_STORE, UPDATE_STORE } from "../utils/mutations";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_GET_USER, QUERY_GET_USER_STORE_PROFILE } from "../utils/queries";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function FormStore(props) {

	// Destructuring the useContext with the UserContext passed in

	const { user } = useContext(UserContext);

	/* Using the ADD_STORE mutation and destructuring it to assign data, loading, and error values
	addStore is also referenced so that it can later be used for posting data to the database and refetching queries
	*/
	const [addStore, { data, loading, error }] = useMutation(ADD_STORE);

	const [updateStore, { data: updatedData, loading: updatedLoading, error: updatedError }] = useMutation(UPDATE_STORE);

	// Setting states and their values
	const [store, setStore] = useState({
		storeTitle: "",
		email: "",
		address: "",
		phoneNumber: "",
	});

	const [country, setCountry] = useState("Canada");
	const [city, setCity] = useState("Toronto");
	const [street, setStreet] = useState("");

	
	useEffect(() => {
		setStore({ ...store, address: `${street}, ${city}, ${country}` });
	}, [city, country, street]);

	const {
		loading: userQueryLoad,
		data: userQueryData,
		error: userQueryError,
	} = useQuery(QUERY_GET_USER, { variables: { id: user.me._id } });

	const userData = userQueryData?.getUser || { "Didnt Get": "The Data" };
	console.log("CHECKING USER DATA ON FORM STORE WOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOW")
	console.log(userData)

	const [storeId, setStoreId] = useState("");

	console.log("STORE IDDDDDDDDDDDDDD")
	console.log(storeId)

	const [getUserStore, { loading: existingStoreLoading, data: existingStoreData, error: existingStoreError }] = useLazyQuery(
		QUERY_GET_USER_STORE_PROFILE,
		{
			variables: { id: storeId },
		}
	);

	const recievedStoreData = existingStoreData?.getStore || { "Didnt Get": "The Data" };
	console.log(recievedStoreData)
	

	useEffect(() => {
		if (storeId && !store.storeTitle) {
			console.log("MADE IT INSIDE IF STATEMENT")
			getUserStore({ variables: { id: storeId } })
	
			setStore({ ...store,
				storeTitle: recievedStoreData.storeTitle,
				email: recievedStoreData.email,
				address: recievedStoreData.address,
				phoneNumber: recievedStoreData.phoneNumber
			})
		}
	}, [store,
		recievedStoreData.storeTitle,
		recievedStoreData.email,
		recievedStoreData.address,
		recievedStoreData.phoneNumber,
		storeId,
		getUserStore]);
	console.log("OUT OF IF STATEMENT")

	useEffect(() => {
		if (userQueryData && userQueryData.getUser && userQueryData.getUser.store) {
			setStoreId(userQueryData.getUser.store._id);
		}
	}, [userQueryData, userQueryError, userQueryLoad]);


	console.log({...store})
	console.log("CHECK PLEASEPLEASEPLEASEPLEASEPLEASEPLEASE")
	console.log(store.storeTitle)


	// Handling the submit for the store form
	/* Running the addStore mutation and passing in the values from the form,
	then refetching the queries for content update
	*/
	const handleSubmit = () => {

		if (storeId) {
			
			try {
				updateStore({
					variables: {
						id: storeId,
						storeData: {
							storeTitle: store.storeTitle,
							email: store.email,
							address: store.address,
							phoneNumber: store.phoneNumber,
						},
					},

					refetchQueries: [
						{
							query: QUERY_GET_USER,
							variables: { id: user.me._id}
						},
					]
				});
				props.onCancel();
			}
			catch (err) {
				console.log(err)
			}

		} else {

			try {
				addStore({
					variables: {
						storeData: {
							storeTitle: store.storeTitle,
							email: store.email,
							address: store.address,
							phoneNumber: store.phoneNumber,
						},
					},
					refetchQueries: [
						{
							query: QUERY_GET_USER,
							variables: { id: user.me._id}
						},
					]
				});
				props.onCancel();
			}
			catch (err) {
				console.log(err)
			}
		}

	};
	console.log("ABOVE RETURN")
	return (
		<div className="space-y-8 divide-y divide-gray-200">
			<div className=" overflow-hidden sm:rounded-lg">
				<div className="px-4 py-5 sm:px-6">
					<div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
						<div className="space-y-6 sm:space-y-5">
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
									Store Title
								</label>
								<div className="mt-1 lg:mt-0 sm:col-span-2">
									<input
										onChange={(e) =>
											setStore({ ...store, storeTitle: e.target.value })
										}
										value={store.storeTitle}
										type="text"
										name="storeTitle"
										id="storeTitle"
										className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
									Phone Number
								</label>
								<div className="mt-1 lg:mt-0 sm:col-span-2">
									<input
										onChange={(e) =>
											setStore({ ...store, phoneNumber: e.target.value })
										}
										value={store.phoneNumber}
										type="text"
										name="phoneNumber"
										id="phoneNumber"
										className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Email address
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										onChange={(e) =>
											setStore({ ...store, email: e.target.value })
										}
										value={store.email}
										id="email"
										name="email"
										type="text"
										className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Country
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<select
										id="country"
										name="country"
										onChange={(e) => setCountry(e.target.value)}
										className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									>
										<option value="United States">United States</option>
										<option value="Canada">Canada</option>
									</select>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="street"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Street address
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										onChange={(e) => setStreet(e.target.value)}
										value={street}
										id="street"
										name="street"
										type="text"
										autoComplete="street"
										className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="city"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									City
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										onChange={(e) => setCity(e.target.value)}
										value={city}
										type="text"
										name="city"
										id="city"
										autoComplete="address-level2"
										className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>
						</div>
					</div>
					<div className="pt-5">
						<div className="flex justify-end">
							<button
								onClick={() => props.onCancel()}
								type="button"
								className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Cancel
							</button>
							<button
								onClick={() => handleSubmit()}
								type="button"
								className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
