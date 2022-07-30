import { useState, useEffect } from "react";
import { ArchiveIcon } from "@heroicons/react/solid";

export default function FormProduct(props) {
	const [errors, setErrors] = useState([]);

	const [product, setProduct] = useState({
		name: "",
		description: "",
		price: "",
		image: "",
		tags: [],
		productPhoto: "",
	});

	const checkFormErrors = () => {
		const { description, price, image, tags, name } = product;
		let formErrors = [];
		if (!name) formErrors.push("name");
		if (!description) formErrors.push("description");
		if (!price) formErrors.push("price");
		if (!image) formErrors.push("image");
		if (!tags.length) formErrors.push("tags");
		return formErrors;
	};

	const handleProductSubmit = () => {
		const formErrors = checkFormErrors();

		if (formErrors.length) {
			setErrors(formErrors);
			// do not submit form to api
			return;
		}
	};

	useEffect(() => {
		if (errors.length) {
			const formErrors = checkFormErrors();
			setErrors(formErrors);
		}
	}, [product, errors]);

	const handleImageUpload = (error, result) => {
		if (!error && result && result.event === "success") {
			setProduct({
				...product,
				image: result.info.secure_url,
			});
		}
	};

	const cloudinaryWidget = window.cloudinary.createUploadWidget(
		{
			cloudName: "dum9rkikg",
			uploadPreset: "zcfintyj",
		},
		handleImageUpload
	);

	const generateInputClassName = (error) => {
		let className = "";
		if (error) {
			className += "border-red-500";
		} else {
			className += "border-gray-300";
		}
		className +=
			" flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-lg sm:text-sm ";
		return className;
	};

	return (
		<form className="space-y-8 divide-y divide-gray-200">
			<div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
				<div>
					<div className="mt-6 sm:mt-5 space-y-6 sm:space-y-5">
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="productName"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Product Name
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<div className="max-w-lg flex rounded-md shadow-sm">
									<input
										value={product.name}
										onChange={(e) =>
											setProduct({ ...product, name: e.target.value })
										}
										type="text"
										id="productName"
										name="productName"
										className={generateInputClassName(errors.includes("name"))}
									/>
								</div>
							</div>
						</div>

						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="about"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Product Description
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<textarea
									id="description"
									name="description"
									value={product.description}
									onChange={(e) =>
										setProduct({ ...product, description: e.target.value })
									}
									rows={3}
									className={generateInputClassName(
										errors.includes("description")
									)}
									defaultValue={""}
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="about"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Price
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									onChange={(e) =>
										setProduct({ ...product, price: e.target.value })
									}
									value={product.price}
									id="description"
									name="description"
									className={generateInputClassName(errors.includes("price"))}
									defaultValue={""}
								/>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="tags"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Product Tags
							</label>
							<div className="mt-1 sm:mt-0 sm:col-span-2">
								<input
									type="text"
									id="description"
									name="description"
									onChange={(e) => {
										const tagArray = e.target.value.split(",");
										setProduct({ ...product, tags: tagArray });
									}}
									className={generateInputClassName(errors.includes("tags"))}
									defaultValue={""}
								/>
								<p>
									Press enter tags comma seperated. E.g. clothes, summer,
									t-shirt
								</p>
							</div>
						</div>
						<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
							<label
								htmlFor="cover-photo"
								className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
							>
								Product photo
							</label>

							{product.image ? (
								<div className="w-full relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
									<img
										src={product.image}
										alt={product.image}
										className="w-full h-full object-center object-cover group-hover:opacity-75"
									/>
									<div
										onClick={() => {
											setProduct({
												...product,
												image: "",
											});
										}}
										className="absolute top-0 right-0 cursor-pointer"
									>
										<ArchiveIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400 hover:text-red-400" />
									</div>
								</div>
							) : (
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<div
										onClick={() => {
											cloudinaryWidget.open();
										}}
										className={`${
											errors.includes("image")
												? "border-red-400"
												: "border-gray-300"
										} max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-dashed  rounded-md`}
									>
										<div className="space-y-1 text-center">
											<svg
												className="mx-auto h-12 w-12 text-gray-400"
												stroke="currentColor"
												fill="none"
												viewBox="0 0 48 48"
												aria-hidden="true"
											>
												<path
													d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
													strokeWidth={2}
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
											<div className="flex text-2xl text-center text-gray-600">
												<label
													htmlFor="file-upload"
													className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
												>
													<span>Upload a file</span>
												</label>
											</div>
											<p className="text-xs text-gray-500">
												PNG, JPG, GIF up to 10MB
											</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="pt-5">
				<div className="flex justify-end">
					<button
						onClick={() => props.onCancel()}
						type="button"
						className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Cancel
					</button>
					<button
						onClick={() => handleProductSubmit()}
						type="button"
						className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Save
					</button>
				</div>
			</div>
		</form>
	);
}
