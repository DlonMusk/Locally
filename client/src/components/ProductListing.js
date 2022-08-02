import { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_PRODUCT } from "../utils/queries";
import ReviewForm from "./ReviewForm";
import Like from "./Like";

export default function ProductListing() {
	const { productId } = useParams();

	const [showReviewForm, setShowReviewForm] = useState(false);

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

	console.log("EEEEEEEEEE CONTEXT CHECK---------------")
	console.log("")

	// product id
	const testProductID = "62e5b958820df4975ed9ce44"


	const { loading, data, error } = useQuery(QUERY_GET_USER_PRODUCT, { variables: { id: testProductID }, });

	console.log("PRODUCT Data is---------------------");
	console.log(data)
	console.log("PRODUCT loading is " + loading);
	console.log("PRODUCT error is--------------------")
	console.log(error)



	const productData = data?.getUserProduct || { "Didnt Get": "The Data" };
	console.log("PRODUCT INFORMATION GRAB CHECK---------------")
	console.log(productData);
	console.log(productData.reviews)

	const productNestedReviews = productData.reviews
	const productTags = productData.tags
	console.log("NESTED REVIEWS4444444444444444444")
	console.log(productNestedReviews)
	console.log(typeof productNestedReviews)

	let reviewProductArray = [];
	let tagArray = [];

	for (var key in productNestedReviews) {
		if (productNestedReviews.hasOwnProperty(key)) {
			console.log("Made it here")
			console.log(key)
			console.log(productNestedReviews[key])

			const reviewNestedUserData = productNestedReviews[key].userData
			console.log("THIS IS THE NESTED THING CHECK")
			console.log(reviewNestedUserData)
			if (reviewNestedUserData !== null) {
				console.log("222222222222222222222222222------------------------")
				console.log(reviewNestedUserData.username)
				console.log("keyyyyyyyyyyyyyyyyyyyyyyyyy")
				console.log(key)

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
				])

				console.log(typeof productTags)
				console.log("P R O D U C T    P U S H     C H E C K --------")
				console.log(reviewProductArray)
			}
			console.log("MADE IT THERE")

		}
	}

	for (var tagIndex in productTags) {
		if (productTags.hasOwnProperty(tagIndex)) {
			tagArray.push([
				// INDEX 0 tag name
				productTags[tagIndex]
			])
		}
	}

	console.log(tagArray)
	console.log("THIS IS REVIEW ARRAYS")
	console.log(reviewProductArray)


	return (
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
									<li>{tag}</li>
								))}
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>

					{/* Product info */}
					<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
						<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
							{productData.productTitle}
						</h1>

						<div className="mt-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl text-gray-900">${productData.productPrice}</p>
						</div>

						<div className="mt-6">
							<h3 className="sr-only">{productData.productDescription}</h3>

							<div
								className="text-base text-gray-700 space-y-6"
								dangerouslySetInnerHTML={{ __html: productData.productDescription }}
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
												<h3 className="text-sm font-semibold">
													{item[6]}
												</h3>
												<p className="text-sm font-medium text-gray-700">
													{productData.productTitle}
												</p>
												<p className="text-sm text-gray-500">
													{item[4]}
												</p>
											</div>
											<p className="text-sm text-gray-500">
												{item[1]}
											</p>
										</div>
									</div>
								</li>
							))}
						</ul>

						<form className="mt-6">
							<div className="mt-10 flex sm:flex-col1">
								<button
									type="submit"
									className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
								>
									Add to bag
								</button>

								<button
									type="button"
									className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
								>
									<Like likes={productData.likes} componentId={productId} />
									<span className="sr-only">Add to favorites</span>
								</button>
							</div>
						</form>
						<button
							type="button"
							onClick={() => setShowReviewForm(!showReviewForm)}
							className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Write Review
						</button>
						<ReviewForm
							open={showReviewForm}
							setOpen={(open) => setShowReviewForm(open)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
