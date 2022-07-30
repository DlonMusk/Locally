import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
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

	return (
		<div className="bg-red-100">
			<div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2 id="products-heading" className="sr-only">
					Products
				</h2>

				<div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
					{products.map((product) => (
						<a
							key={product.id}
							href={`/product/${product.id}`}
							className="group"
						>
							<div className="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
								<img
									src={product.imageSrc}
									alt={product.imageAlt}
									className="w-full h-full object-center object-cover group-hover:opacity-75"
								/>
							</div>
							<div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
								<h3>{product.name}</h3>
								<Like productId={product.id} />
							</div>
							<p className="mt-1 text-sm italic text-gray-500 items-center justify-between ">
								{product.description}
								<p className="font-medium text-gray-900">{product.price}</p>
							</p>
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
