import { useState, useEffect, useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_STORE } from "../utils/queries";
import { UserContext } from "../contexts/UserContext";
import Like from "./Like";

export default function ProductList(props) {
	// store id
	const testingID = props.storeId || "62e5b6e4820df4975ed9ce2f";


	const { loading, data, error } = useQuery(QUERY_GET_USER_STORE, {
		variables: { id: testingID },
	});

	const { searchState, searchData } = useContext(UserContext);

	useEffect(() => {

	}, [searchState, searchData]);


	const storeData = data?.getStore || { "Didnt Get": "The Data" };
	const productObject = storeData.products;

	let productArray = [];

	for (var key in productObject) {
		if (productObject.hasOwnProperty(key)) {

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
				productObject[key].tags,
			]);
		}
	}


	return (
		<div className="bg-red-100">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 id="products-heading" className="sr-only">
					Products
				</h2>

				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
					{productArray.map((product) => (
						<div>
							<div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
								<a
									key={product[0]}
									href={`/product/${product[0]}`}
									className="group"
								>
								<img
									src={product[4]}
									alt={product[4]}
									className="w-full h-full object-center object-cover group-hover:opacity-75"
								/>
								</a>
							</div>
							<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
								<h3>{product[1]}</h3>
								<span>
                                    <FaHeart />
                                    {product[5]}
                                </span>
							</div>
							<p className="mt-1 text-sm italic text-gray-500 items-center justify-between ">
								{product[2]}
								<p className="font-medium text-gray-900">${product[3]}</p>
							</p>
							{product[7].map((tag) => (
								<span className=" mt-4 ml-4 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
									<svg
										className="mr-1.5 h-2 w-2 text-indigo-400"
										fill="currentColor"
										viewBox="0 0 8 8"
									>
										<circle cx={4} cy={4} r={3} />
									</svg>
									{tag}
								</span>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
