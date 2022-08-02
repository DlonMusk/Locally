import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_STORE } from "../utils/queries";
import Like from "./Like";

export default function ProductList(props) {
	// store id
	const testingID = props.storeId || "62e5b6e4820df4975ed9ce2f";
	console.log("PRODUCTLIST PROP STOREID CHECK!!!!!!!!!!!!!!")
	console.log(props.storeId)

	const { loading, data, error } = useQuery(QUERY_GET_USER_STORE, {
		variables: { id: testingID },
	});

	console.log("ENTIRE STORE DATA IS---------------------");
	console.log(data);
	console.log("ENTIRE STORE LOADING IS " + loading);
	console.log("ENTIRE STORE ERROR IS--------------------");
	console.log(error);

	const storeData = data?.getStore || { "Didnt Get": "The Data" };
	console.log(storeData);
	const productObject = storeData.products;
	console.log(productObject);
	console.log("TYPE OF TESTING--------------");
	console.log(typeof storeData, typeof productObject);

	let productArray = [];

	for (var key in productObject) {
		if (productObject.hasOwnProperty(key)) {
			console.log("Made it here");
			console.log(key);
			productArray.push([
				// index 0 id of product
				productObject[key]._id,
				// index 1 title of product
				productObject[key].productTitle,
				// index 2 description of product
				productObject[key].productDescription,
				// index 3 price of product
				productObject[key].productPrice,
				// index 4 image of product
				productObject[key].productImage,
				// index 5 amount of likes for product
				productObject[key].likes,
				// index 6 stock of product
				productObject[key].stock,

				// // index 7 tags for product
				productObject[key].tags
			])
			console.log("MADE IT THERE")
		}
	}
	console.log("THIS IS PRODUCT ARRAY");
	console.log(productArray);
	console.log(typeof productArray);

	return (
		<div className="bg-red-100">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 id="products-heading" className="sr-only">
					Products
				</h2>

				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
					{productArray.map((product) => (
						<a
							key={product[0]}
							href={`/product/${product[0]}`}
							className="group"
						>
							<div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
								<img
									src={product[4]}
									alt={product[4]}
									className="w-full h-full object-center object-cover group-hover:opacity-75"
								/>
							</div>
							<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
								<h3>{product[1]}</h3>
								<Like productId={product[0]} />
							</div>
							<p className="mt-1 text-sm italic text-gray-500 items-center justify-between ">
								{product[2]}
								<p className="font-medium text-gray-900">${product[3]}</p>
							</p>
							{product[7].map(tag => (
								<li>{tag}</li>
							))}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
