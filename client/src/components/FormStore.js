export default function FormStore(props) {
	return (
		<form className="space-y-8 divide-y divide-gray-200">
			<div className="bg- shadow overflow-hidden sm:rounded-lg">
				<div className="bg-slate-50 px-4 py-5 sm:px-6">
					<div className="pt-8 space-y-6 sm:pt-10 sm:space-y-5">
						<div>
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								Store Details
							</h3>
							<p className="mt-1 max-w-2xl text-sm text-gray-500">
								Please provide the details of your store, this includes your
								store's contact information.
							</p>
						</div>
						<div className="space-y-6 sm:space-y-5">
							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
									Phone Number
								</label>
								<div className="mt-1 lg:mt-0 sm:col-span-2">
									<input
										type="text"
										name="phoneNumber"
										id="phoneNumber"
										className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Email address
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										id="email"
										name="email"
										type="text"
										autoComplete="email"
										className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="country"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Country
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<select
										id="country"
										name="country"
										autoComplete="country-name"
										className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									>
										<option>United States</option>
										<option>Canada</option>
									</select>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="street-address"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									Street address
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										type="text"
										name="street-address"
										id="street-address"
										autoComplete="street-address"
										className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
									/>
								</div>
							</div>

							<div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
								<label
									htmlFor="city"
									className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
								>
									City
								</label>
								<div className="mt-1 sm:mt-0 sm:col-span-2">
									<input
										type="text"
										name="city"
										id="city"
										autoComplete="address-level2"
										className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
									/>
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
								type="submit"
								className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								Save
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}
