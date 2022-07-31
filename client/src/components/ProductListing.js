import { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import { HeartIcon } from "@heroicons/react/outline";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_PRODUCT } from "../utils/queries";
import Like from "./Like";

export default function ProductListing() {
	const { productId } = useParams();

	const [product, setProduct] = useState({
		name: "Example product",
		productId: productId,
		price: "$99999",
		rating: 4,
		seller: {
			name: "Example seller",
			id: 1212,
		},
		image: "https://source.unsplash.com/random/800x600",
		description: `
		<p>Please insert product description from API here</p>
		<p>Product ID: ${productId}</p>
	`,
	});
	// NEED TO HAVE ROUTES WORKING FOR INDIVIDUAL PRODUCTS FIRST BEFORE I CAN USE PAGE TO TEST POPULATION
	/*
	console.log("EEEEEEEEEE CONTEXT CHECK---------------")
	console.log("")

	const testingID = "62e5b6e4820df4975ed9ce2f";
	const testingID2 = "62e595024f09121c389aef19";
	const testProductID = "62e5b958820df4975ed9ce44"


	const { loading, data, error } = useQuery(QUERY_GET_USER_PRODUCT, {variables: { id: testProductID},});

	console.log("PRODUCT Data is---------------------");
    console.log(data)
    console.log("PRODUCT loading is " + loading);
    console.log("PRODUCT error is--------------------")
    console.log(error)



	const productData = data?.getUserProduct || {"Didnt Get": "The Data"};
	console.log("PRODUCT INFORMATION GRAB CHECK---------------")
    console.log(productData);
*/

	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
					<Tab.Group as="div" className="flex flex-col-reverse">
						<div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none"></div>

						<Tab.Panels className="w-full aspect-w-1 aspect-h-1">
							<Tab.Panel>
								<img
									src={product.image}
									className="w-full h-full object-center object-cover sm:rounded-lg"
								/>
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>

					{/* Product info */}
					<div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
						<h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
							{product.name}
						</h1>

						<div className="mt-3">
							<h2 className="sr-only">Product information</h2>
							<p className="text-3xl text-gray-900">{product.price}</p>
						</div>

						<div className="mt-6">
							<h3 className="sr-only">Description</h3>

							<div
								className="text-base text-gray-700 space-y-6"
								dangerouslySetInnerHTML={{ __html: product.description }}
							/>
						</div>

						<form className="mt-6">
							<div className="mt-10 flex sm:flex-col1">
								<button
									type="submit"
									className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
								>
									Add to bag
								</button>

								<button
									type="button"
									className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
								>
									<Like productId={productId} />
									<span className="sr-only">Add to favorites</span>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
