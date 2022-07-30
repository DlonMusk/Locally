import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { validateEmail } from "../../utils/helpers";


const SignUp = () => {

	// set initial form state
	const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

	const [errorMessage, setErrorMessage] = useState("");

	const { username, email, password } = userFormData;

	/*
	// set state for form validation
	const [validated] = useState(false);
	// set state for alert
	const [showAlert, setShowAlert] = useState(false);
	*/

	/* Assigning an array containing the addUser resolver and an error object,
	addUser will use the ADD_USER mutation, and error will log errors that occur
	*/
	const [addUser, { error }] = useMutation(ADD_USER);

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setUserFormData({ ...userFormData, [name]: value });
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		const validCheck = validateEmail(email);

		if (!validCheck || username === '' || password === '') {
            setErrorMessage("Please fill out a username, valid email, and password")
        } else {
			// If checks are passed, then the program will use emailJS and send the required information to be used to send an email to my inbox
			console.log("Form data SUBMIT check", userFormData)
		
			/*
			// check if form has everything (as per react-bootstrap docs)
			const form = event.currentTarget;
			if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
			}
			console.log("VALID CHECK-------------")
			console.log(form.checkValidity());
			*/
		
			try {
			const { data } = await addUser({
				variables: { ...userFormData },
			});
			Auth.login(data.addUser.token);
			} catch (err) {
			console.error(err);
			setErrorMessage("Something went wrong with the authentication process");
			}
		
			setUserFormData({
			username: '',
			email: '',
			password: '',
			});
			console.log("After submittion reset form data check", userFormData)

			// Defining inputs to the query of the field ids for the form
			const inputs = document.querySelectorAll('#username, #email, #password');

			// Runs a for each method to clear the fields after hitting submit so that what was submitted doesnt stay in the form
			inputs.forEach(input => {
				input.value = '';
			});
		}
	};


	return (
		<div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
			<div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
				<div className="px-4 py-8 sm:px-10">
					<div className="mt-6">
						<form noValidate onSubmit={handleFormSubmit} action="#" method="POST" className="space-y-6">
							{errorMessage && (
							<div>
								<p className="errorAlert">{errorMessage}</p>
							</div>
							)}
							<div>
								<label htmlFor="name" className="sr-only">
									Username
								</label>
								<input
									type="text"
									name="username"
									id="username"
									autoComplete="username"
									placeholder="Username"
									onChange={handleInputChange}
									value={username}
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
										userFormData.username && 
										userFormData.email && 
										userFormData.password
										)}
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
									variant="success"
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
