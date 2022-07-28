import React from "react";
import ProductCard from "./ProductCard";
import { SimpleGrid } from "@chakra-ui/react";

const Products = () => {
	const productData = [
		{
			productTitle: "Product 1",
			productDescription: "Product 1 description",
			productPrice: "$100",
			productImage: "https://source.unsplash.com/random",
			stock: 10,
			likes: 10,
			Tags: ["tag1", "tag2"],
		},
		{
			productTitle: "Product 2",
			productDescription: "Product 2 description",
			productPrice: "$200",
			productImage: "https://source.unsplash.com/random",
			stock: 20,
			likes: 20,
			Tags: ["tag1", "tag2"],
		},
		{
			productTitle: "Product 3",
			productDescription: "Product 3 description",
			productPrice: "$300",
			productImage: "https://source.unsplash.com/random",
			stock: 30,
			likes: 30,
			Tags: ["tag1", "tag2"],
		},
		{
			productTitle: "Product 4",
			productDescription: "Product 4 description",
			productPrice: "$400",
			productImage: "https://source.unsplash.com/random",
			stock: 40,
			likes: 40,
			Tags: ["tag1", "tag2"],
		},
	];

	return (
		<section className="products-section">
			<SimpleGrid columns={2} spacing={8}>
				{productData.map((product) => {
					return (
						<ProductCard
							productTitle={product.productTitle}
							productDescription={product.productDescription}
							productPrice={product.productPrice}
							productImage={product.productImage}
							stock={product.stock}
							likes={product.likes}
							Tags={product.Tags}
						/>
					);
				})}
			</SimpleGrid>
		</section>
	);
};
export default Products;
