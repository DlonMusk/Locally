// Will add code here later
import React from "react";

function Header() {
	return (
		<header>
			<h1>Locally</h1>
			<div className="hidden sm:block flex-shrink flex-grow-0 justify-start px-2">
				<div className="inline-block">
					<div className="inline-flex items-center max-w-full">
						<button
							className="flex items-center flex-grow-0 flex-shrink pl-2 relative w-60 border rounded-full px-1  py-1"
							type="button"
						>
							<div className="block flex-grow flex-shrink overflow-hidden">
								Where Search will go
							</div>
							<div className="flex items-center justify-center relative  h-8 w-8 rounded-full"></div>
						</button>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
