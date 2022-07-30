const SignUp = () => {
	return (
		<div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
			<div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden border-gray-300 shadow-md">
				<div className="px-4 py-8 sm:px-10">
					<div className="mt-6">
						<form action="#" method="POST" className="space-y-6">
							<div>
								<label htmlFor="name" className="sr-only">
									Full name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									autoComplete="name"
									placeholder="Full name"
									required
									className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>

							<div>
								<label htmlFor="email" className="sr-only">
									Email
								</label>
								<input
									type="text"
									name="email"
									id="email"
									autoComplete="email"
									placeholder="Email"
									required
									className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>

							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									placeholder="Password"
									autoComplete="current-password"
									required
									className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>

							<div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Create your account
								</button>
							</div>
						</form>
					</div>
				</div>

				<div className="my-6 relative">
					<div
						className="absolute inset-0 flex items-center"
						aria-hidden="true"
					>
						<div className="w-full border-t border-gray-300" />
					</div>
					<div className="relative flex justify-center text-sm">
						<a href="/login" className="px-2 bg-white text-gray-500">
							Or Login
						</a>
					</div>
				</div>
				{/* <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10"></div> */}
			</div>
		</div>
	);
};

export default SignUp;
