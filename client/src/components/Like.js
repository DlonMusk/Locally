import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ADD_LIKE } from "../utils/mutations";

const Like = (props) => {
	const [hovered, setHovered] = useState(false);

	const [addLike, { loading, data }] = useMutation(ADD_LIKE)

	const likeProduct = () => {
		// call api to like product from props.productId
	};

	return (
		<span
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={`text-red-${hovered ? "500" : "900"}  hover: opacity-40`}
			onClick={() => likeProduct()}
		>
			<FaHeart />
		</span>
	);
};

export default Like;
