import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_STORE_REVIEWS } from "../utils/queries";

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

export default function Reviews(props) {
	const [showReviewForm, setShowReviewForm] = useState(false);

	// store id
	const testingID = props.storeId || "62e5b6e4820df4975ed9ce2f";

	const { loading, data, error } = useQuery(QUERY_GET_STORE_REVIEWS, {
		variables: { id: testingID },
	});

	console.log("REVIEW DATA IS---------------------");
	console.log(data);
	console.log("REVIEW LOADING IS " + loading);
	console.log("REVIEW ERROR IS--------------------");
	console.log(error);

	const reviewData = data?.getStore || { "Didnt Get": "The Data" };
	console.log(reviewData);
	const reviewNestedData = reviewData.products;
	console.log(reviewNestedData);

	let reviewProductArray = [];
	let reviewArray = [];

	for (var key in reviewNestedData) {
		if (reviewNestedData.hasOwnProperty(key)) {
			console.log("Made it here");
			console.log(key);
			console.log(reviewNestedData[key]);
			const reviewNestedDataReviews = reviewNestedData[key].reviews;
			console.log("THIS IS THE NESTED THING CHECK");
			console.log(reviewNestedDataReviews);
			if (reviewNestedDataReviews !== null) {
				console.log("222222222222222222222222222------------------------");

				let testMap = reviewNestedDataReviews.map(function (element) {
					reviewArray.push([
						element._id,
						element.postContent,
						element.likes,
						element.destinationId._id,
						element.createdAt,
						element.userData._id,
						element.userData.username,
					]);
					return [
						element._id,
						element.postContent,
						element.likes,
						element.destinationId._id,
						element.createdAt,
						element.userData._id,
						element.userData.username,
					];
				});
				console.log(reviewArray);
				console.log(testMap);
				console.log("@@@@@@@@@@@@ ACCESSING ARRAY @@@@@@@@@@@");
				console.log(reviewArray[key]);
				for (let i = 0; i < reviewArray.length; i++) {
					console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
					console.log(i);
					console.log("keyyyyyyyyyyyyyyyyyyyyyyyyy");
					console.log(key);
					if (reviewArray[i][3] === reviewNestedData[key]._id) {
						reviewProductArray.push([
							// product id INDEX 0
							reviewNestedData[key]._id,
							// product title INDEX 1
							reviewNestedData[key].productTitle,
							// product image INDEX 2
							reviewNestedData[key].productImage,
							// review id INDEX 3
							reviewArray[i][0],
							// review content INDEX 4
							reviewArray[i][1],
							// review likes INDEX 5
							reviewArray[i][2],
							// review destination id INDEX 6
							reviewArray[i][3],
							// review created at INDEX 7
							reviewArray[i][4],
							// user id (of the reviewer) at INDEX 8
							reviewArray[i][5],
							// username (of the reviewer) at INDEX 9
							reviewArray[i][6],
						]);
					}
				}
				console.log("P R O D U C T    P U S H     C H E C K --------");
				console.log(reviewProductArray);
			}
			console.log("P U S H      C H E C K");
			console.log(reviewArray);
			console.log("MADE IT THERE");
		}
	}
	console.log("THIS IS REVIEW ARRAYS");
	console.log(reviewProductArray);
	console.log(reviewArray);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<ul role="list" className="divide-y divide-gray-200">
					{reviewProductArray.map((reviewItem) => (
						<li key={reviewItem[3]} className="py-4">
							<div className="flex space-x-3">
								<img
									className="h-6 w-6 rounded-full"
									src={reviewItem[2]}
									alt=""
								/>
								<div className="flex-1 space-y-1">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-semibold">{reviewItem[9]}</h3>
										<p className="text-sm font-medium text-gray-700">
											{reviewItem[1]}
										</p>
										<p className="text-sm text-gray-500">{reviewItem[7]}</p>
									</div>
									<p className="text-sm text-gray-500">{reviewItem[4]}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
