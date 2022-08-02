import { useMutation } from "@apollo/client";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ADD_LIKE } from "../utils/mutations";

const Like = ({likes, componentId}) => {
	const [hovered, setHovered] = useState(false);

	const [addLike, { loading, data }] = useMutation(ADD_LIKE)


	return (
		<span
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className={`text-red-${hovered ? "500" : "900"}  hover: opacity-40`}
			onClick={() => addLike({
				variables: {componentId: componentId}
			})}
		>
			{likes}
			<FaHeart />
		</span>
	);
};

export default Like;
