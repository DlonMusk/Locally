import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_STORE_REVIEWS  } from "../utils/queries";

//Need to get the reviews from the database

const users = [
	{
		username: "Lindsay Walton",
		image: "https://source.unsplash.com/random/400x400",
	},
	{
		username: "John Doe",
		image: "https://source.unsplash.com/random/400x400",
	},
	{
		username: "Jane Doe",
		image: "https://source.unsplash.com/random/400x400",
	},
	{
		username: "Benjamin B",
		image: "https://source.unsplash.com/random/400x400",
	},
	{
		username: "Rabia S",
		image: "https://source.unsplash.com/random/400x400",
	},
	{
		username: "Dylan K",
		image: "https://source.unsplash.com/random/400x400",
	},
];

const reviewItems = new Array(4).fill("").map((item, i) => ({
	id: i,
	person: users[Math.floor(Math.random(0, 1) * users.length)],
	product: "Product 1",
	postContent: "I love this product",
	createdAt: "1h",
}));

export default function Reviews() {
	const [showReviewForm, setShowReviewForm] = useState(false);

	// store id
	const testingID = "62e5b6e4820df4975ed9ce2f";
    const testingID2 = "62e362617a57c366aabd62ac";

    const { loading, data, error } = useQuery(QUERY_GET_STORE_REVIEWS, {variables: { id: testingID},});

	console.log("REVIEW DATA IS---------------------");
    console.log(data)
    console.log("REVIEW LOADING IS " + loading);
    console.log("REVIEW ERROR IS--------------------")
    console.log(error)

	const reviewData = data?.getStore || {"Didnt Get": "The Data"};
    console.log(reviewData);
	const reviewNestedData = reviewData.products
	console.log(reviewNestedData)

	let reviewProductArray = [];
	let reviewArray = []

	for (var key in reviewNestedData) {
		if (reviewNestedData.hasOwnProperty(key)) {
			console.log("Made it here")
			console.log(key)
			console.log(reviewNestedData[key])
			const reviewNestedDataReviews = reviewNestedData[key].reviews;
			console.log("THIS IS THE NESTED THING CHECK")
			console.log(reviewNestedDataReviews)
			if (reviewNestedDataReviews !== null) {
				console.log("222222222222222222222222222------------------------")
				// console.log(reviewNestedDataReviews[key])

				let testMap = reviewNestedDataReviews.map(function(element){
					reviewArray.push([
						element._id, element.postContent, element.likes, element.destinationId, element.createdAt
					])
					return [element._id, element.postContent, element.likes, element.destinationId, element.createdAt];
				})
				console.log(testMap)
				console.log("@@@@@@@@@@@@ ACCESSING ARRAY @@@@@@@@@@@")
				//console.log(testMap[key])
				reviewProductArray.push([
					reviewNestedData[key]._id,
					reviewNestedData[key].productTitle,
					testMap[key]
				])
				console.log("P R O D U C T    P U S H     C H E C K --------")
				console.log(reviewProductArray)

				// if (reviewNestedDataReviews.hasOwnProperty(key)) {
				// 	console.log("INSIDE NESTED DATA CHECK")
				// 	console.log(reviewNestedDataReviews[key])
				// }
				// reviewArray.push([
				// 	reviewNestedDataReviews
				// ])
			}
			console.log("P U S H      C H E C K")
			console.log(reviewArray)
			// if (reviewNestedDataReviews.hasOwnProperty(key)) {
			// 	console.log("INSIDE NESTED DATA CHECK")
			// 	console.log(reviewNestedDataReviews[key])
			// }
			// reviewNestedData.push([
			// 	// index 0
			// 	reviewNestedData[key]._id,
			// 	// index 1
			// 	reviewNestedData[key].productTitle,
			// 	// index 2
			// 	reviewNestedData[key].productDescription,
			// 	// index 3
			// 	reviewNestedData[key].productPrice,
			// 	// index 4
			// 	reviewNestedData[key].productImage,
			// 	// index 5
			// 	reviewNestedData[key].likes,
			// 	// index 6
			// 	reviewNestedData[key].stock
			// ])
			console.log("MADE IT THERE")
			
		}
		}
		console.log("THIS IS REVIEW ARRAYS")
		console.log(reviewProductArray)
		console.log(reviewArray)


	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<ul role="list" className="divide-y divide-gray-200">
					{reviewItems.map((reviewItem) => (
						<li key={reviewItem.id} className="py-4">
							<div className="flex space-x-3">
								<img
									className="h-6 w-6 rounded-full"
									src={reviewItem.person.image}
									alt=""
								/>
								<div className="flex-1 space-y-1">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-semibold">
											{reviewItem.person.username}
										</h3>
										<p className="text-sm font-medium text-gray-700">
											{reviewItem.product}
										</p>
										<p className="text-sm text-gray-500">
											{reviewItem.createdAt}
										</p>
									</div>
									<p className="text-sm text-gray-500">
										{reviewItem.postContent}
									</p>
								</div>
							</div>
						</li>
					))}
				</ul>
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
	);
}
