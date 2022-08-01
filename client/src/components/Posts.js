// Will add code here later
import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_POSTS } from "../utils/queries";


const Posts = () => {

	const testingID = "62e5b8dcad340ea36b2b3244";
	const testingID2 = "62e362617a57c366aabd62ac";

	const { loading, data, error } = useQuery(QUERY_GET_USER_POSTS, { variables: { id: testingID }, });

	console.log("PPPPPPPPPPPOST DATA IS---------------------");
	console.log(data)
	console.log("PPPPPPPPPPPOST LOADING IS " + loading);
	console.log("PPPPPPPPPPPOST ERROR IS--------------------")
	console.log(error)

	const postData = data?.getUserPosts || { "Didnt Get": "The Data" };
	console.log(postData);

	const postDataReviews = postData.reviews
	console.log("NESTED REVIEWS4444444444444444444")
	console.log(postDataReviews)
	console.log(typeof postDataReviews)


	let reviewProductArray = [];
	let reviewArray = []

	for (var key in postDataReviews) {
		if (postDataReviews.hasOwnProperty(key)) {
			console.log("Made it here")
			console.log(key)
			console.log(postDataReviews[key])
			// const reviewNestedReviews = [
			// 	productNestedReviews[key]._id,
			// 	productNestedReviews[key].postContent,
			// 	productNestedReviews[key].likes,
			// 	productNestedReviews[key].review,
			// 	productNestedReviews[key].createdAt,
			// ];
			const postDataProduct = postDataReviews[key].destinationId
			console.log("THIS IS THE NESTED THING CHECK")
			console.log(postDataProduct)

			console.log("222222222222222222222222222------------------------")
			// console.log(reviewNestedDataReviews[key])

			// let testMap = reviewNestedUserData.map(function(element){
			// 	reviewArray.push([
			// 		element._id, element.username
			// 	])
			// 	return [element._id, element.username];
			// })

			//console.log(testMap)
			console.log("@@@@@@@@@@@@ ACCESSING ARRAY @@@@@@@@@@@")
			//console.log(reviewArray[key])

			console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
			//console.log(i)
			console.log("keyyyyyyyyyyyyyyyyyyyyyyyyy")
			console.log(key)

			reviewProductArray.push([
				// INDEX 0 review id
				postDataReviews[key]._id,
				// INDEX 1 the content of the review
				postDataReviews[key].postContent,
				// INDEX 2 like amount for review
				postDataReviews[key].likes,
				// INDEX 3 returns true or false value based on if itss a review or not
				postDataReviews[key].review,
				// INDEX 4 time review was created
				postDataReviews[key].createdAt,
				// INDEX 5 username of the user making the reviews
				postData.username,


			])

			if (postDataProduct !== null) {
				reviewProductArray[key].push(
					// INDEX 6 product id the review is about
					postDataProduct._id,
					// INDEX 7 product title the review is about
					postDataProduct.productTitle,
					// INDEX 8 product image the review is about
					postDataProduct.productImage,
				)



				console.log("P R O D U C T    P U S H     C H E C K --------")
				console.log(reviewProductArray)
			}
			console.log("P U S H      C H E C K")
			console.log(reviewArray)
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
					{reviewProductArray.map((reviewItem) => (
						<li key={reviewItem[0]} className="py-4" id={reviewItem[3].toString()}>

							{reviewItem[3] ? (
								<h2>
									ITS A REVIEW
								</h2>
							) : (
								<h2>
									ITS A POST
								</h2>
							)}
							<div className="flex space-x-3">
								<img
									className="h-6 w-6 rounded-full"
									src={reviewItem[8]}
									alt=""
								/>
								<div className="flex-1 space-y-1">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-semibold">
											{reviewItem[5]}
										</h3>
										<p className="text-sm font-medium text-gray-700">
											{reviewItem[7]}
										</p>
										<p className="text-sm text-gray-500">
											{reviewItem[4]}
										</p>
									</div>
									<p className="text-sm text-gray-500">
										{reviewItem[1]}
									</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default Posts;