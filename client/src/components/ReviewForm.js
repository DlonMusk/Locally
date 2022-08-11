import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { ADD_POST_REVIEW } from "../utils/mutations";
import { QUERY_GET_USER_PRODUCT, QUERY_GET_USER_POSTS } from "../utils/queries";


export default function ReviewForm(props) {
	// Grabbing route location and using it to grab the product id
	const location = useLocation();
	const productLink = location.pathname;
	let productId = productLink.replaceAll("/product/", "");

	// True False check depending on if the route location contains product or not
	let reviewPostCheck = productLink.includes("/product/");

	// set initial form state
	const [userFormData, setUserFormData] = useState({ reviewInput: "" });

	const [errorMessage, setErrorMessage] = useState("");

	const { reviewInput } = userFormData;

	// Assigning array to empty for later populating
	const userArray = [];

	const {
		loading: userQueryLoad,
		data: userQueryData,
		error: userQueryError,
	} = useQuery(GET_ME);

	const currentUser = userQueryData;

	for (var key in currentUser) {
		if (currentUser.hasOwnProperty(key)) {
			const currentUserId = currentUser[key]._id;

			userArray.push(
				// pushing the id into the array so it can be read without crashing
				currentUserId
			);
		}
	}


	const [addPostReview, { data, loading, error }] =
		useMutation(ADD_POST_REVIEW);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};


	// Handling the form submit, makes checks if page is a post or product page, and sets queries and mutations accordingly
	const handleFormSubmit = async (event) => {
		event.preventDefault();


		if (!reviewInput || reviewInput === "") {
			setErrorMessage("Please write a review");
		} else {
			if (!reviewPostCheck) {
				try {
					addPostReview({
						variables: {
							postReviewData: {
								postContent: reviewInput,
								review: false,
								userData: userArray[0],
							},
						},
						refetchQueries: [
							{
								query: QUERY_GET_USER_POSTS,
								variables: { id: userArray[0] },
							},
						],
					});
				} catch (err) {
					setErrorMessage(
						"Something went wrong with the post/review creation process"
					);
				}
			} else {
				try {
					addPostReview({
						variables: {
							postReviewData: {
								postContent: reviewInput,
								destinationId: productId,
								review: true,
								userData: userArray[0],
							},
						},
						refetchQueries: [
							{
								query: QUERY_GET_USER_PRODUCT,
								variables: { id: productId },
							},
						],
					});
				} catch (err) {
					setErrorMessage(
						"Something went wrong with the post/review creation process"
					);
				}
			}

			setUserFormData({
				reviewInput: "",
			});

			// Defining inputs to the query of the field ids for the form
			const inputs = document.querySelectorAll("#reviewInput");

			// Runs a for each method to clear the fields after hitting submit so that what was submitted doesnt stay in the form
			inputs.forEach((input) => {
				input.value = "";
			});

			props.setOpen(false)
		}
	};

	return (
		<Transition.Root show={props.open} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 overflow-hidden"
				onClose={() => props.setOpen(false)}
			>
				<div className="absolute inset-0 overflow-hidden">
					<Dialog.Overlay className="absolute inset-0" />

					<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
						<Transition.Child
							as={Fragment}
							enter="transform transition ease-in-out duration-500 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition ease-in-out duration-500 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<div className="pointer-events-auto w-screen max-w-md">
								<form
									noValidate
									onSubmit={handleFormSubmit}
									action="#"
									method="POST"
									className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl"
								>
									{errorMessage && (
										<div>
											<p className="errorAlert">{errorMessage}</p>
										</div>
									)}
									<div className="h-0 flex-1 overflow-y-auto">
										<div className="bg-indigo-700 py-6 px-4 sm:px-6">
											<div className="flex items-center justify-between">
												<Dialog.Title className="text-lg font-medium text-white">
													{reviewPostCheck ? "Write A Review" : "Create A Post"}
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="rounded-md bg-indigo-700 text-indigo-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
														onClick={() => props.setOpen(false)}
													>
														<span className="sr-only">Close panel</span>
														<XIcon className="h-6 w-6" aria-hidden="true" />
													</button>
												</div>
											</div>
											<div className="mt-1">
												<p className="text-sm text-indigo-300">
													{reviewPostCheck ? "Give a review for this seller" : "What are you thinking?!"}
												</p>
											</div>
										</div>
										<div className="flex flex-1 flex-col justify-between">
											<div className="divide-y divide-gray-200 px-4 sm:px-6">
												<div className="space-y-6 pt-6 pb-5">
													<div>
														<label
															htmlFor="description"
															className="block text-sm font-medium text-gray-900"
														>
															{" "}
															Description{" "}
														</label>
														<div className="mt-1">
															<textarea
																id="reviewInput"
																name="reviewInput"
																placeholder={reviewPostCheck ? "Write your review" : "Write your post"}
																rows={4}
																value={reviewInput}
																required
																className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
																onChange={handleInputChange}
															/>
														</div>
													</div>
												</div>
												<div className="pt-4 pb-6"></div>
											</div>
										</div>
									</div>
									<div className="flex flex-shrink-0 justify-end px-4 py-4">
										<button
											type="button"
											className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
											onClick={() => props.setOpen(false)}
										>
											Cancel
										</button>
										<button
											disabled={!userFormData.reviewInput}
											type="submit"
											className="ml-4 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
