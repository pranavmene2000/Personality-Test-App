import React from "react";

function Loading() {
	return (
		<div className='min-h-screen flex items-center justify-center '>
			<div className='z-20 animate-pulse'>
				{" "}
				<div className='w-20 h-20 bg-white rounded-full'></div>
			</div>
		</div>
	);
}

export default Loading;
