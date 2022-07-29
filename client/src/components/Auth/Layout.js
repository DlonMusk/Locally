import React, { useState } from "react";
import { ChevronRightIcon } from "@heroicons/react/solid";

const Layout = ({ children }) => {
	return (
		<>
			<main className="mt-16 sm:mt-24 container mx-auto h-[70vh]">
				<div className="mx-auto max-w-7xl">
					<div className="lg:grid lg:grid-cols-12 lg:gap-8">
						<div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
							<div>
								<h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
									<span className="text-indigo-400 md:block">Locally</span>
								</h1>
								<p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
									Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
									qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
									occaecat fugiat aliqua ad ad non deserunt sunt.
								</p>
							</div>
						</div>
						{children}
					</div>
				</div>
			</main>
		</>
	);
};

export default Layout;
