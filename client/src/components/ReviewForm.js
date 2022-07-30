import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import {
	LinkIcon,
	PlusSmIcon,
	QuestionMarkCircleIcon,
} from "@heroicons/react/solid";

const team = [
	{
		name: "Tom Cook",
		email: "tom.cook@example.com",
		href: "#",
		imageUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	},
	{
		name: "Whitney Francis",
		email: "whitney.francis@example.com",
		href: "#",
		imageUrl:
			"https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	},
	{
		name: "Leonard Krasner",
		email: "leonard.krasner@example.com",
		href: "#",
		imageUrl:
			"https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	},
	{
		name: "Floyd Miles",
		email: "floy.dmiles@example.com",
		href: "#",
		imageUrl:
			"https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	},
	{
		name: "Emily Selman",
		email: "emily.selman@example.com",
		href: "#",
		imageUrl:
			"https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
	},
];

export default function Example(props) {
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
								<form className="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl">
									<div className="h-0 flex-1 overflow-y-auto">
										<div className="bg-indigo-700 py-6 px-4 sm:px-6">
											<div className="flex items-center justify-between">
												<Dialog.Title className="text-lg font-medium text-white">
													{" "}
													New Review{" "}
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
													Give a review for this seller.
												</p>
											</div>
										</div>
										<div className="flex flex-1 flex-col justify-between">
											<div className="divide-y divide-gray-200 px-4 sm:px-6">
												<div className="space-y-6 pt-6 pb-5">
													<div>
														<label
															htmlFor="your-name"
															className="block text-sm font-medium text-gray-900"
														>
															Your Name
														</label>
														<div className="mt-1">
															<input
																type="text"
																id="your-name"
																className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
															/>
														</div>
													</div>
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
																id="description"
																name="description"
																rows={4}
																className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
																defaultValue={""}
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
