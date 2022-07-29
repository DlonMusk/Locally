import React from "react";
import { Box, Image, Badge, Button, Stack, IconButton } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({
	productTitle,
	productDescription,
	productPrice,
	productImage,
	stock,
	likes,
	Tags,
}) => {
	return (
		<Box
			maxW="sm"
			mx="auto"
			borderWidth="1px"
			borderRadius="10px"
			p={4}
			overflow="hidden"
		>
			<Image src={productImage} alt={productTitle} />
			<Box p={4}>
				<IconButton
					icon={<FaHeart />}
					variant="ghost"
					color="red.500"
					size="sm"
					aria-label="Like"
					onClick={() => {}}
				/>
				<Box
					display="flex"
					fontSize="lg"
					fontWeight="bold"
					mb={2}
					alignItems="baseline"
				>
					<Badge borderRadius="full" px="2" colorScheme="teal" py="2">
						{stock} in stock
					</Badge>
					{productTitle}
				</Box>
				<Box
					color="gray.500"
					fontWeight="semibold"
					letterSpacing="wide"
					fontSize="xs"
					textTransform="uppercase"
					ml="2"
				>
					{Tags[0]} &bull; {Tags[1]}
				</Box>

				<Box>{productDescription}</Box>
				<Box>{productPrice}</Box>
				<Box>{likes}</Box>
			</Box>
		</Box>
	);
};

export default ProductCard;
