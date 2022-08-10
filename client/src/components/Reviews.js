import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_GET_STORE_REVIEWS } from "../utils/queries";

//Need to get the reviews from the database


export default function Reviews(props) {

	const testingID = props.storeId || "62e5b6e4820df4975ed9ce2f";

	const { loading, data, error } = useQuery(QUERY_GET_STORE_REVIEWS, {
		variables: { id: testingID },
	});

	console.log("TESTING IDDDDDDDDDDDDDDDDDDDDDDDD")
	console.log(testingID)

	const reviewData = data?.getStore || { "Didnt Get": "The Data" };
	
	const reviewNestedData = reviewData.products;

	console.log("REVIEW DATAAAAAAAAAAAAAAAAAAA")
	console.log(reviewNestedData)
	

	let reviewProductArray = [];
	let reviewArray = [];

	for (var key in reviewNestedData) {
		if (reviewNestedData.hasOwnProperty(key)) {

			const reviewNestedDataReviews = reviewNestedData[key].reviews;
			console.log("NESTED CHECK!!!!!!!!!!!!!!!!!")
			console.log(reviewNestedDataReviews)
			if (reviewNestedDataReviews !== null) {

				reviewNestedDataReviews.map(function (element) {
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

				for (let i = 0; i < reviewArray.length; i++) {
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
							reviewArray[i][4].substr(0, 10),
							// user id (of the reviewer) at INDEX 8
							reviewArray[i][5],
							// username (of the reviewer) at INDEX 9
							reviewArray[i][6],
						]);
					}
				}
			}
		}
	}

	// Comparator function which will sort reviews by date
	function Comparator(a, b) {
		if (a[7] < b[7]) return 1;
		if (a[7] > b[7]) return -1;
		return 0;
	}

	/* Sorting with Comparator, without this, the array will only sort by date for each product without taking other products into account
	For example, without this it will sort in this way:

	product 1: June 5
	product 1: June 20
	product 2: June 2
	product 2: June 15

	With this sorting, it will instead work like this:

	product 2: June 2
	product 1: June 5
	product 2: June 15
	product 1: June 20
	
	*/
	reviewProductArray = reviewProductArray.sort(Comparator);


	console.log("REVIEW PRODUCT ARRAY GGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG")
	console.log(reviewProductArray)

	

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<ul role="list" className="divide-y divide-gray-200 mb-20">
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
