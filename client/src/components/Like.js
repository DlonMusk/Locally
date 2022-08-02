import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ADD_LIKE } from "../utils/mutations";
import { QUERY_GET_USER_PRODUCT, QUERY_GET_PRODUCTS } from "../utils/queries";

const Like = ({likes, componentId}) => {
	const [hovered, setHovered] = useState(false);

	const [addLike, { loading, data }] = useMutation(ADD_LIKE)

	const location = useLocation();
	const productLink = location.pathname;
	let productId = productLink.replaceAll("/product/", "");
	console.log("LIKE COMPONENT LIKE COMPONENT LIKE COMPONENT LIKE COMPONENT LIKE COMPONENT LIKE COMPONENT ")
	console.log(productId + "does this show up?")
	console.log(componentId + "I might be doing the wrong thing")

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
	
	console.log(newComponentId)
	console.log("USED QUERY VALUE55555555555555")
	if (usedQuery === QUERY_GET_USER_PRODUCT) {
		console.log(true)
	} else {
		console.log(false)
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
