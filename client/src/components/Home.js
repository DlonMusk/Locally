import React from "react";
import { useQuery} from "@apollo/client";
import { QUERY_GET_PRODUCTS } from "../utils/queries";
import { FaHeart } from "react-icons/fa";


export default function HomeList(props) {

	const { loading, data, error } = useQuery(QUERY_GET_PRODUCTS, {
		variables: { searchName: "", tagState: "All", searchData: "searchData" },
	});


	const homeData = props.searchData ||
		data?.getProducts || { "Didnt Get": "The Data" };


	let homeArray = [];

	if (data) {
		for (var key in homeData) {
			if (homeData.hasOwnProperty(key)) {

				const homeDataStoreInfo = homeData[key].storeInfo;

				homeArray.push([
					// INDEX 0 product id
					homeData[key]._id,
					// INDEX 1 product title
					homeData[key].productTitle,
					// INDEX 2 product description
					homeData[key].productDescription,
					// INDEX 3 product image
					homeData[key].productImage,
					// INDEX 4 product price
					homeData[key].productPrice,
					// INDEX 5 product stock
					homeData[key].stock,
					// INDEX 6 product amount of likes
					homeData[key].likes,
					// INDEX 7 product tags
					homeData[key].tags,
					// INDEX 8 product created at time
					homeData[key].createdAt,
					// INDEX 9 store id
					homeDataStoreInfo._id,
					// INDEX 10 store title
					homeDataStoreInfo.storeTitle,
					// INDEX 11 store address
					homeDataStoreInfo.address,
				]);
			}
		}
	}

    let timelineArray = homeArray.slice(0).reverse().map(function(homeArray) {
        return homeArray;
    });

	return (
		<div className="bg-white">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 id="products-heading" className="sr-only">
					Does this show up?
				</h2>

				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
					{timelineArray.map((product) => (
						<div>

								<div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3 shadow-sm">
                                <a
                                    key={product[0]}
                                    href={`/product/${product[0]}`}
                                    className="group"
                                >
                                    <img
										src={product[3]}
										alt={product[3]}
										className="w-full h-full object-center object-cover group-hover:opacity-75"
									/>
                                </a>
								</div>
								<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
									<h3>{product[1]}</h3>
                                    <span>
                                    <FaHeart />
                                    {product[6]}
                                    </span>
								</div>
									<div className="text-gray-500 italic">{product[10]}</div>
								<p className="mt-1 text-sm italic text-gray-500 items-center justify-between ">
									{product[2]}

									<p className="font-medium text-gray-900">${product[4]}</p>
								</p>
								{product[7].map((tag) => (
									<span className=" mt-4 ml-4 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-indigo-100 text-indigo-800">
										<svg
											className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400"
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
