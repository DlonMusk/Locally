import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_GET_USER_STORE,  } from "../utils/queries";
import Like from "./Like";

export default function ProductList() {
	const [products, setProducts] = useState([
		{
			id: 1,
			name: "Paper",
			href: "#",
			price: "$13",
			description: "Paper description",
			imageSrc: "https://source.unsplash.com/random/400x400",
			imageAlt: "alt text",
		},
		{
			id: 2,
			name: "Tea Cup",
			href: "#",
			price: "$64",
			description: "Bone China",
			imageSrc: "https://source.unsplash.com/random/400x400",
			imageAlt: "Alt text",
		},
		{
			id: 3,
			name: "Coffee Mug",
			href: "#",
			price: "$32",
			description: "Pastel",
			imageSrc: "https://source.unsplash.com/random/400x400",
			imageAlt: "Alt text",
		},
	]);

	useEffect(() => {
		// call api to get products
		// set state to products
	}, []);

	
	// Was using the WRONG query lol
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

	const testingID = "62e5b6e4820df4975ed9ce2f";
    const testingID2 = "62e362617a57c366aabd62ac";

    const { loading, data, error } = useQuery(QUERY_GET_USER_STORE, {variables: { id: testingID},});

	console.log("ENTIRE STORE DATA IS---------------------");
    console.log(data)
    console.log("ENTIRE STORE LOADING IS " + loading);
    console.log("ENTIRE STORE ERROR IS--------------------")
    console.log(error)

	const storeData = data?.getStore || {"Didnt Get": "The Data"};
    console.log(storeData);
	const productTest = storeData.products
	console.log(productTest)
	console.log("TYPE OF TESTING--------------")
	console.log(typeof storeData, typeof productTest)

	let productArray = [];

	for (var key in productTest) {
	if (productTest.hasOwnProperty(key)) {
		console.log("Made it here")
		console.log(key)
		productArray.push([
			// index 0
			productTest[key]._id,
			// index 1
			productTest[key].productTitle,
			// index 2
			productTest[key].productDescription,
			// index 3
			productTest[key].productPrice,
			// index 4
			productTest[key].productImage,
			// index 5
			productTest[key].likes,
			// index 6
			productTest[key].stock
		])
		console.log("MADE IT THERE")
		
	}
	}
	console.log("THIS IS PRODUCT ARRAY")
	console.log(productArray)
	console.log(typeof productArray)

	return (
		<div className="bg-red-100">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 id="products-heading" className="sr-only">
					Products
				</h2>

				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
					{productArray.map(product => (
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
								<p className="font-medium text-gray-900">{product[3]}</p>
							</p>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
