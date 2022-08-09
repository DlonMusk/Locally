import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArchiveIcon } from "@heroicons/react/solid";
import { QUERY_GET_USER_STORE, QUERY_GET_USER, QUERY_GET_USER_PRODUCT } from "../utils/queries";
import { ADD_PRODUCT, UPDATE_PRODUCT } from "../utils/mutations";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";

export default function FormProduct(props) {
	/* Using the ADD_PRODUCT mutation and destructuring it to assign data, loading, and error values
	addProduct is also referenced so that it can later be used for posting data to the database and refetching queries
	*/
	const [addProduct, { data, loading, error }] = useMutation(ADD_PRODUCT);

	const [updateProduct, { data: updatedData, loading: updatedLoading, error: updatedError }] = useMutation(UPDATE_PRODUCT);

	// Setting states and their values
	const [errors, setErrors] = useState([]);

	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		image: "",
		tags: [],
		stock: 10,
	});

	const userArray = [];
	// Grabbing the current route location of the page and then using it to assign a user id value
	const location = useLocation();
	const profileLink = location.pathname
	let userId = profileLink.replaceAll("/profile/", "");

	let listingPageCheck = profileLink.includes("/product/");
	console.log("LISTING PAGE CHECK")
	console.log(listingPageCheck)

	const [currentProductId, setCurrentProductId] = useState("");

	const [getUserProduct, { loading: currentProductLoading, data: currentProductData, error: currentProductError }] = useLazyQuery(QUERY_GET_USER_PRODUCT, {
		variables: { id: currentProductId },
	});

	const recievedProductData = currentProductData?.getUserProduct || { "Didnt Get": "The Data" };
	console.log(recievedProductData)

	useEffect(() => {

		if (listingPageCheck && !product.name) {
			setCurrentProductId(profileLink.replaceAll("/product/", ""));
			console.log("IS THIS INSIDE THE LISTING IF STATEMENT??????????")
			console.log(currentProductId)
			getUserProduct({ variables: { id: currentProductId } })
			console.log("IIIIIIIIISSSSSS RECIEVEDPRODUCTDATA WORKING!?!?!?!?!?!?!?")
			console.log(recievedProductData)
			console.log("STORE INFO DOES IT EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEXIST??????")
			console.log(recievedProductData.storeInfo)
			console.log("PROOOOOOOOOOOOOOOOOOOOOODUCT DAAAAAAAAAAAAAATA")
			console.log(currentProductData)
			console.log(currentProductId)
	
			// MAKE SURE TO INCLUDE TAGS HERE LATER, WONT DO IT NOW CAUSE IT NEEDS TO WORK WITH DYLANS CHANGE TO THE TAG RELATED TYPEDEFS
	
			setProduct({ ...product,
				name: recievedProductData.productTitle,
				description: recievedProductData.productDescription,
				price: recievedProductData.productPrice,
				image: recievedProductData.productImage,
			})
	
		}
		
	}, [product,
		recievedProductData.productTitle,
		recievedProductData.productDescription,
		recievedProductData.productPrice,
		recievedProductData.productImage,
		recievedProductData.stock,
		listingPageCheck,
		currentProductId,
		profileLink,
		getUserProduct]);

	console.log("OUT IF LIST IF THINGYYYYYYYYYYYYYYYYYYYYYYYY")
	console.log(currentProductId)


	/* Using the QUERY_GET_USER query and having it check for a matching id which matches the userId value
	Keep in mind that the loading, data, and error destrucutred values need to be in a format such as
	loading: userQueryLoad, otherwise, it can not reference the query values because theyre already assigned
	in the ADD_PRODUCT mutation above
	*/
	const {
		loading: userQueryLoad,
		data: userQueryData,
		error: userQueryError,
	} = useQuery(QUERY_GET_USER, { variables: { id: userId } })

	console.log("QUERY DATA FOR UUUUUUUUUUUUUUUUUUUUSER")
	console.log(userQueryData)
	const currentStore = userQueryData?.getUser.store._id
	console.log(currentStore)

	// Checking if there are values for each field in the form, if values are missing, return an error
	const checkFormErrors = () => {
		const { description, price, image, tags, name } = product;
		let formErrors = [];
		if (!name) formErrors.push("name");
		if (!description) formErrors.push("description");
		if (!price) formErrors.push("price");
		if (!image) formErrors.push("image");
		if (!tags.length) formErrors.push("tags");
		return formErrors;
	};

	// Handles the submit for the product form, if there is a length to the formErrors, it will set and error
	const handleProductSubmit = () => {
		const formErrors = checkFormErrors();

		if (formErrors.length) {
			setErrors(formErrors);
			return;
		}

		if (listingPageCheck) {
			console.log("UPDATING PRODUCT UUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUU")
			
			try {
				updateProduct({
					variables: {
						id: currentProductId,
						productData: {
							productTitle: product.name,
							productDescription: product.description,
							productPrice: product.price,
							productImage: product.image,
							storeInfo: recievedProductData.storeInfo._id,
						},
					},

					refetchQueries: [
						{
							query: QUERY_GET_USER_PRODUCT,
							variables: { id: currentProductId}
						},
					]
				});
				props.onCancel();
			}
			catch (err) {
				console.log(err)
			}

		} else {
			console.log("TRYING TO ADD A PRODUCT HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")

			/* Running the addProduct mutation and passing in the values from the form,
			then refetching the queries for content update
			*/
			try {
				addProduct({
					variables: {
						productData: {
							productTitle: product.name,
							productDescription: product.description,
							productPrice: parseInt(product.price),
							productImage: product.image,
							stock: product.stock,
							tags: product.tags,
							storeInfo: currentStore,
		
						},
					},
					refetchQueries: [ {
						query: QUERY_GET_USER_STORE,
						variables: { id: currentStore }
					 }],
				});
				props.onCancel();
			}
			catch (err) {
				console.log(err)
			}
		}
	};

	useEffect(() => {
		console.log(data);
		console.log(loading);
		console.log(error);
	}, [data, loading, error]);

	useEffect(() => {
		if (errors.length) {
			const formErrors = checkFormErrors();
			setErrors(formErrors);
		}
	}, [product, errors]);

	// Handling the image uploading for the form, passing in image data to the database if no errors occur
	const handleImageUpload = (error, result) => {
		if (!error && result && result.event === "success") {
			setProduct({
				...product,
				image: result.info.secure_url,
			});
		}
	};

	// Cloudinary key values
	const cloudinaryWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: "dum9rkikg",
			uploadPreset: "zcfintyj",
		},
		handleImageUpload
	);

	// If check for assigning styling based on if theres an error or not
	const generateInputClassName = (error) => {
		let className = "";
		if (error) {
			className += "border-red-500";
		} else {
			className += "border-gray-300";
		}
		className +=
			" flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-lg sm:text-sm ";
		return className;
	};

	return (
		<div className="space-y-8 divide-y divide-gray-200">
			<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
				<div>
					<div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="productName"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Product Name
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<div className="max-w-lg flex rounded-md shadow-sm">
									<input
										value={product.name}
										onChange={(e) =>
											setProduct({ ...product, name: e.target.value })
										}
										type="text"
										id="productName"
										name="productName"
										className={generateInputClassName(errors.includes("name"))}
									/>
								</div>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="about"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Product Description
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<textarea
									id="description"
									name="description"
									value={product.description}
									onChange={(e) =>
										setProduct({ ...product, description: e.target.value })
									}
									rows={3}
									className={generateInputClassName(
										errors.includes("description")
									)}
									defaultValue={""}
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="about"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Price
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									onChange={(e) =>
										setProduct({ ...product, price: e.target.value })
									}
									value={product.price}
									id="description"
									name="description"
									className={generateInputClassName(errors.includes("price"))}
									defaultValue={""}
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="tags"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Product Tags
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									id="description"
									name="description"
									onChange={(e) => {
										const tagArray = e.target.value.split(",");
										setProduct({ ...product, tags: tagArray });
									}}
									className={generateInputClassName(errors.includes("tags"))}
									defaultValue={""}
								/>
								<p>
									Press enter tags comma seperated. E.g. clothes, summer,
									t-shirt
								</p>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="cover-photo"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Product photo
							</label>

							{product.image ? (
								<div className="w-full relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
									<img
										src={product.image}
										alt={product.image}
										className="w-full h-full object-center object-cover group-hover:opacity-75"
									/>
									<div
										onClick={() => {
											setProduct({
												...product,
												image: "",
											});
										}}
										className="absolute top-0 right-0 cursor-pointer"
									>
										<ArchiveIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400 hover:text-red-400" />
									</div>
								</div>
							) : (
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div
										onClick={() => {
											cloudinaryWidget.open();
										}}
										className={`${
											errors.includes("image")
												? "border-red-400"
												: "border-gray-300"
										} max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-dashed  rounded-md`}
									>
										<div className="space-y-1 text-center">
											<svg
												className="mx-auto h-12 w-12 text-gray-400"
												stroke="currentColor"
												fill="none"
												viewBox="0 0 48 48"
												aria-hidden="true"
											>
												<path
													d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
													strokeWidth={2}
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<div className="flex text-2xl text-center text-gray-600">
												<label
													htmlFor="file-upload"
													className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
												>
													<span>Upload a file</span>
												</label>
											</div>
											<p className="text-xs text-gray-500">
												PNG, JPG, GIF up to 10MB
											</p>
										</div>
									</div>
								</div>
							)}
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
						onClick={() => handleProductSubmit()}
						type="button"
						className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>
			</div>
		</div>
	);
}
