import React, { useState } from "react";
import ReviewForm from "./ReviewForm";

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
