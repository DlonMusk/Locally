// Will add code here later
import React from "react";
import { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_POSTS } from "../utils/queries";
import { UserContext } from "../contexts/UserContext";
import ReviewForm from "./ReviewForm";
import Like from "./Like";

const Posts = (props) => {
	const [showReviewForm, setShowReviewForm] = useState(false);

	// user id set to the value of props.profileId, or a placeholder id value
	const testingID = props.profileId || "62e595024f09121c389aef19";

	/* Using the QUERY_GET_USER_POSTS query and destructuring it to assign loading, data, and error values,
    then assigning the variables to match the id with the current user id value
    */
	const { loading, data, error } = useQuery(QUERY_GET_USER_POSTS, {
		variables: { id: testingID },
	});

	/* Assigning the postData to the value of the getUserPosts object from data,
	or an object with preassigned values to log for errors if needed
	*/
	const postData = data?.getUserPosts || { "Didnt Get": "The Data" };

	// Assigning value to the reviews object inside of postData
	const postDataReviews = postData.reviews;

	// Assigning postArray to an empty array to be populated later
	let postArray = [];

	// This will map through the postDataReviews object using a hasOwnProperty method
	for (var key in postDataReviews) {
		if (postDataReviews.hasOwnProperty(key)) {

			/* Assigning postDataProduct to the postDataReviews object's destinationId property (which is array)
			so that it can be read through and have its values referenced
			*/
			const postDataProduct = postDataReviews[key].destinationId;

			/* Pushing the mapped through values of the data retrieval into the postArray for use in
			the return segment of the code
			*/
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
				postDataReviews[key].createdAt.substr(0, 10),
				// INDEX 5 username of the user making the reviews
				postData.username,
			]);

			// If there are values from the destinationId of the retrieved data, push those values into the postArray
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

	const { user } = useContext(UserContext);

	let timelineArray = postArray.slice(0).reverse().map(function(postArray) {
        return postArray;
    });


	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div className="max-w-3xl mx-auto">
			<button
					type="button"
					onClick={() => setShowReviewForm(!showReviewForm)}
					className={`inline-flex items-center mt-4 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
						user?.me._id === testingID ? "" : "hidden"
					}`}
				>
					Create A Post
				</button>
				<ReviewForm
					open={showReviewForm}
					setOpen={(open) => setShowReviewForm(open)}
				/>
				<ul role="list" className="divide-y divide-gray-200 mb-20">
					{timelineArray.map((reviewItem) => (
						<li
							key={reviewItem[0]}
							className="py-4"
							id={reviewItem[3].toString()}
						>
							{reviewItem[3] ? <h2 className="inline-flex px-2.5 py-0.5 rounded-md mb-2 bg-indigo-100 text-indigo-800">Review</h2> :
							<h2 className="inline-flex px-2.5 py-0.5 rounded-md mb-2 bg-sky-100 text-sky-800">Post</h2>}
							<div className="flex space-x-3">
								<img
									className="h-6 w-6 rounded-full"
									src={ reviewItem[8] ? `${reviewItem[8]}` : `https://source.unsplash.com/random/400x400`}
									alt=""
								/>
								<div className="flex-1 space-y-1">
									<div className="flex items-center justify-between">
										<h3 className="text-sm font-semibold">{reviewItem[5]}</h3>
										<p className="text-sm font-medium text-gray-700">
											<a
											href={`/product/${reviewItem[6]}`}
											className="hover:text-gray-400 focus:text-gray-900"
											>
											{reviewItem[7]}
											</a>
										</p>
										<p className="text-sm text-gray-500">{reviewItem[4]}</p>
									</div>
									<p className="text-sm text-gray-500">{reviewItem[1]}</p>
								</div>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Posts;
