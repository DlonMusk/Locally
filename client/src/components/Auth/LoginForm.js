import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { validateEmail, validatePassword } from "../../utils/helpers";


const Login = () => {

	// set initial form state
	const [userFormData, setUserFormData] = useState({ email: '', password: '' });

	const [errorMessage, setErrorMessage] = useState("");

	const { email, password } = userFormData;

	/* Assigning an array containing the login resolver and an error object,
	login will use the LOGIN_USER mutation, and error will log errors that occur
	*/
	const [login, { error }] = useMutation(LOGIN_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const validCheck = validateEmail(email);
		const passwordCheck = validatePassword(password)

		if (!validCheck || !passwordCheck) {
            setErrorMessage("Please fill out a valid email, and password")
			console.log("button isnt working")
        } else {
			// If checks are passed, then the program will check for a matching email and password from the database for login
			console.log("Form data SUBMIT check", userFormData)
		
			try {
			// Using email.toLowerCase to make the query for matching email to be in lower case, as all email fields will be stored in lowercase to prevent case related errors
			const { data } = await login({
				variables: { email: email.toLowerCase(), password },
			});
			Auth.login(data.login.token);
			} catch (err) {
			console.error(err);
			setErrorMessage("Something went wrong with the authentication process");
			}
		
			setUserFormData({
			email: '',
			password: '',
			});
			console.log("After submittion reset form data check", userFormData)

			// Defining inputs to the query of the field ids for the form
			const inputs = document.querySelectorAll('#email, #password');

			// Runs a for each method to clear the fields after hitting submit so that what was submitted doesnt stay in the form
			inputs.forEach(input => {
				input.value = '';
			});
		}
	};

	return (
		<div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
			<div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden border-gray-300 shadow-md">
				<div className="px-4 py-8 sm:px-10">
					<div className="mt-6">
						<form noValidate onSubmit={handleFormSubmit} action="#" method="POST" className="space-y-6">
							{errorMessage && (
							<div>
								<p className="errorAlert">{errorMessage}</p>
							</div>
							)}
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
									onChange={handleInputChange}
									value={email}
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
									onChange={handleInputChange}
									value={password}
									required
									className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
								/>
							</div>

							<div>
								<button
									disabled={!(
										userFormData.email && 
										userFormData.password
									)}
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Login
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
						<a href="/signup" className="px-2 bg-white text-gray-500">
							Or Register
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
