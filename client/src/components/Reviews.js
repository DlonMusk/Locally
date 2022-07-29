import React from "react";

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
const reviewItems = [
	{
		id: 1,
		person: users[0],
		product: "Product 1",
		postContent: "I love this product",
		createdAt: "1h",
	},
	{
		id: 2,
		person: users[1],
		product: "Product 2",
		postContent: "I love this product",
		createdAt: "1h",
	},
	{
		id: 3,
		person: users[2],
		product: "Product 3",
		postContent: "I love this product",
		createdAt: "1h",
	},
	{
		id: 4,
		person: users[3],
		product: "Product 4",
		postContent: "I love this product",
		createdAt: "1h",
	},
	{
		id: 5,
		person: users[4],
		product: "Product 5",
		postContent: "I love this product",
		createdAt: "1h",
	},
	{
		id: 6,
		person: users[5],
		product: "Product 6",
		postContent: "I love this product",
		createdAt: "1h",
	},
];

export default function Reviews() {
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
											{reviewItem.person.name}
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
			</div>
		</div>
	);
}
