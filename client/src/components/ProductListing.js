import { PencilIcon } from "@heroicons/react/solid";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Tab } from "@headlessui/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_GET_USER_PRODUCT, QUERY_GET_USER_BY_STORE } from "../utils/queries";
import ReviewForm from "./ReviewForm";
import Like from "./Like";
import Modal from "./Modal";
import FormProduct from "./FormProduct";

export default function ProductListing() {
	const { productId } = useParams();


	const [showReviewForm, setShowReviewForm] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [showProductForm, setShowProductForm] = useState(false);

	const [product, setProduct] = useState({
		name: "Example product",
		productId: productId,
		price: "$99999",
		rating: 4,
		seller: {
			name: "Example seller",
			id: 1212,
		},
		image: "https://source.unsplash.com/random/800x600",
		description: `
		<p>Please insert product description from API here</p>
		<p>Product ID: ${productId}</p>
	`,
	});


	// product id set to the value of productId, or a placeholder id value
	const testProductID = productId || "62e5b958820df4975ed9ce44";

	/* Using the QUERY_GET_USER_PRODUCT query and destructuring it to assign loading, data, and error values,
    then assigning the variables to match the id with the current product id value
    */
	const { loading, data, error } = useQuery(QUERY_GET_USER_PRODUCT, {
		variables: { id: testProductID },
	});


	/* Assigning the productData to the value of the getUserProduct object from data,
	or an object with preassigned values to log for errors if needed
	*/
	const productData = data?.getUserProduct || { "Didnt Get": "The Data" };
	const productStoreInfo = productData.storeInfo

	
	// Assigning consts to objects within data retrieval
	const productNestedReviews = productData.reviews;
	const productTags = productData.tags;

	// Assigning empty arrays to be populated later
	let reviewProductArray = [];
	let tagArray = [];
	let storeInfoArray = [];

	// Series of for loops to map through objects from data retrieval and pushing to their respective arrays for referencing in return
	for (var key in productNestedReviews) {
		if (productNestedReviews.hasOwnProperty(key)) {

			const reviewNestedUserData = productNestedReviews[key].userData;

			if (reviewNestedUserData !== null) {

				reviewProductArray.push([
					// INDEX 0 review id
					productNestedReviews[key]._id,
					// INDEX 1 review content
					productNestedReviews[key].postContent,
					// INDEX 2 review amount of likes
					productNestedReviews[key].likes,
					// INDEX 3 review true or false value based on if its a review or a post
					productNestedReviews[key].review,
					// INDEX 4 review time of creation
					productNestedReviews[key].createdAt,
					// INDEX 5 user id
					reviewNestedUserData._id,
					// INDEX 6 username for user
					reviewNestedUserData.username,
				]);
			}
		}
	}

	for (var tagIndex in productTags) {
		if (productTags.hasOwnProperty(tagIndex)) {
			tagArray.push([
				productTags[tagIndex],
			]);
		}
	}

	for (var info in productStoreInfo) {
		if (productStoreInfo.hasOwnProperty(info)) {

			storeInfoArray.push(
				productStoreInfo[info]
			)
		}
	}

	// useQuery for QUERY_GET_USER_BY_STORE to grab the user information of the viewed product for profile linking
	const { loading: loadingUser, data: dataUser, error: errorUser } = useQuery(QUERY_GET_USER_BY_STORE, {
		variables: { id: storeInfoArray[1] },
	});

	console.log("STORE INFO AAAAAAAAAAAAAAAARRAAAAAAAYYYYYYYYYYYY")
	console.log(storeInfoArray)
	console.log("dataUser$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
	console.log(dataUser)

	/* Assigning the userData to the value of the getUserByStore object from data,
	or an object with preassigned values to log for errors if needed
	*/
	const userData = dataUser?.getUserByStore || { "Didnt Get": "The Data" };

	// Assigning storeOwner to the id of the user grabbed in the data retrieval
	const storeOwner = userData._id

	const { user } = useContext(UserContext);


	return (
		<>
		<Modal
		isOpen={showModal}
		title={`Edit Product`}
		onClose={() => {
			setShowModal(false);
			setShowProductForm(false);
		}}
	>
		{showProductForm && (
			<FormProduct
				onCancel={() => {
					setShowModal(false);
					setShowProductForm(false);
				}}
			/>
		)}
		</Modal>
	
		<div className="bg-white">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
					<Tab.Group as="div" className="flex flex-col-reverse">
						<div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none"></div>

						<Tab.Panels className="w-full aspect-w-1 aspect-h-1">
							<Tab.Panel>
								<img
									src={productData.productImage}
									className="w-full h-full object-center object-cover sm:rounded-lg"
								/>
								{tagArray.map((tag) => (
									<span className="inline-flex mt-4 ml-4 items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
										<svg
											className="mr-1.5 h-2 w-2 text-indigo-400"
											fill="currentColor"
											viewBox="0 0 8 8"
										>
											<circle cx={4} cy={4} r={3} />
										</svg>
										{tag}
									</span>
								))}
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>

					
					<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
						<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
							{productData.productTitle}
						</h1>
						<button className="font-extrabold tracking-tight text-gray-500 mt-3">
							<a href={`/profile/${storeOwner}`}>
							{storeInfoArray[2]}
							</a>
						</button>

						<div className="mt-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl text-gray-900">
								${productData.productPrice}
							</p>
						</div>

						<div className="mt-6">
							<h3 className="sr-only">{productData.productDescription}</h3>

							<div
								className="text-base text-gray-700 space-y-6"
								dangerouslySetInnerHTML={{
									__html: productData.productDescription,
								}}
							/>
						</div>

						<ul role="list" className="divide-y divide-gray-200">
							{reviewProductArray.map((item) => (
								<li key={item[0]} className="py-4">
									<div className="flex space-x-3">
										<img
											className="h-6 w-6 rounded-full"
											src={productData.productImage}
											alt=""
										/>
										<div className="flex-1 space-y-1">
											<div className="flex items-center justify-between">
												<h3 className="text-sm font-semibold">{item[6]}</h3>
												<p className="text-sm font-medium text-gray-700">
													{productData.productTitle}
												</p>
												<p className="text-sm text-gray-500">{item[4]}</p>
											</div>
											<p className="text-sm text-gray-500">{item[1]}</p>
											<button>
											<Like likes={item[2]} componentId={"review"+item[0]} />
											</button>
										</div>
									</div>
								</li>
							))}
						</ul>

						<form className="mt-6">
							<div className="mt-10 flex sm:flex-col1">

								<button
									type="button"
									className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
								>
									<Like likes={productData.likes} componentId={"product"+productId} />

									<span className="sr-only">Add to favorites</span>
								</button>
							</div>
						</form>
						{user?.me._id === storeOwner ?
						<button
						type="button"
						onClick={() => {
							setShowProductForm(!showProductForm);
							setShowModal(!showModal);
						}}
						className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						<PencilIcon
							className="-ml-1 mr-2 h-5 w-5 text-gray-500"
							aria-hidden="true"
						/>
						Edit Product
						</button>
					: <button
						type="button"
						onClick={() => setShowReviewForm(!showReviewForm)}
						className={`mt-6 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
							user ? "" : "hidden"
						}`}
					>
						Write Review
					</button>}
						
						<ReviewForm
							open={showReviewForm}
							setOpen={(open) => setShowReviewForm(open)}
						/>
					</div>
				</div>
			</div>
		</div>
		</>
	);
}
