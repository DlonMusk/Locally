// Will add code here later
import React from "react";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_POSTS } from "../utils/queries";
import ReviewForm from "./ReviewForm";
import Like from "./Like";

const Posts = (props) => {
	const [showReviewForm, setShowReviewForm] = useState(false);

	// user id
	const testingID = props.profileId || "62e595024f09121c389aef19";

	const { loading, data, error } = useQuery(QUERY_GET_USER_POSTS, {
		variables: { id: testingID },
	});


	const postData = data?.getUserPosts || { "Didnt Get": "The Data" };


	const postDataReviews = postData.reviews;


	let postArray = [];

	for (var key in postDataReviews) {
		if (postDataReviews.hasOwnProperty(key)) {

			const postDataProduct = postDataReviews[key].destinationId;

			postArray.push([
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
			]);

			if (postDataProduct !== null) {
				postArray[key].push(
					// INDEX 6 product id the review is about
					postDataProduct._id,
					// INDEX 7 product title the review is about
					postDataProduct.productTitle,
					// INDEX 8 product image the review is about
					postDataProduct.productImage
				);

			}

		}
	}


	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
				<ul role="list" className="divide-y divide-gray-200">
					{postArray.map((reviewItem) => (
						<li
							key={reviewItem[0]}
							className="py-4"
							id={reviewItem[3].toString()}
						>
							{reviewItem[3] ? <h2>Review</h2> : <h2>Post</h2>}
							<div className="flex space-x-3">
								<img
									className="h-6 w-6 rounded-full"
									src={reviewItem[8]}
									alt=""
								/>
								<div className="flex-1 space-y-1">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-semibold">{reviewItem[5]}</h3>
										<p className="text-sm font-medium text-gray-700">
											{reviewItem[7]}
										</p>
										<p className="text-sm text-gray-500">{reviewItem[4]}</p>
									</div>
									<p className="text-sm text-gray-500">{reviewItem[1]}</p>
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
					Create A Post
				</button>
				<ReviewForm
					open={showReviewForm}
					setOpen={(open) => setShowReviewForm(open)}
				/>
			</div>
		</div>
	);
};

export default Posts;
