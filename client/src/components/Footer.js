import React from "react";

import {
	Box,
	Container,
	Stack,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";

export default function Footer() {
	return (
		<div className="fixed bottom-0 left-0 right-0">
			<Box
				bg={useColorModeValue("gray.50", "gray.900")}
				color={useColorModeValue("gray.700", "gray.200")}
			>
				<Container
					as={Stack}
					maxW={"6xl"}
					py={4}
					direction={{ base: "column", md: "row" }}
					spacing={4}
					justify={{ base: "center", md: "space-between" }}
					align={{ base: "center", md: "center" }}
				>
					<Stack direction={"row"} spacing={6}>
					</Stack>
					<Text>© {new Date().getFullYear()} Locally </Text>
				</Container>
			</Box>
		</div>
	);
}
