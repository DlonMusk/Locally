import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ADD_LIKE } from "../utils/mutations";
import { QUERY_GET_USER_PRODUCT, QUERY_GET_PRODUCTS } from "../utils/queries";


const Like = ({ likes, componentId }) => {
	// Setting state and their value
	const [hovered, setHovered] = useState(false);

	/* Using the ADD_LIKE mutation and destructuring it to assign data and loading values
	addLike is also referenced so that it can later be used for posting data to the database and refetching queries
	*/
	const [addLike, { loading, data }] = useMutation(ADD_LIKE)

	// Grabbing the current route location of the page and then using it to assign a product id value
	const location = useLocation();
	const productLink = location.pathname;
	let productId = productLink.replaceAll("/product/", "");

	let newComponentId;
	let usedQuery;

	if (!componentId) {
		console.log("No component ID")

	} else if (componentId.includes("product")) {
		newComponentId = componentId.replaceAll("product", "");
		usedQuery = QUERY_GET_USER_PRODUCT;
	} else if (componentId.includes("review")) {
		newComponentId = componentId.replaceAll("review", "");
		usedQuery = QUERY_GET_USER_PRODUCT;
	}

	if (productId === "/") {
		usedQuery = QUERY_GET_PRODUCTS
	}
	




	return (
		<span
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={`text-red-${hovered ? "500" : "900"}  hover: opacity-40`}
			onClick={() => {try {addLike({
				variables: {componentId: newComponentId},
				refetchQueries: [{
					query: usedQuery,
					variables: { id: productId }
				}]
			},
			)}
			catch (err) {
				console.log(err)
			}
		}}

		>
			{likes}
			<FaHeart />
		</span>
	);
};

export default Like;
