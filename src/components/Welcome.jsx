import React from "react";
import { useGlobalContext } from "../context/context";

function Welcome() {
	const { setShowInitialScreen, questions } = useGlobalContext();
	return (
		<div className='min-h-screen flex items-center justify-center '>
			<div className='relative p-3 py-5 md:p-8 bg-white shadow rounded-lg max-w-[800px] w-11/12 min-h-[300px]'>
				<p className='text-center text-3xl font-bold'>
					Welcome To Personality Test 🚀
				</p>
				<p className='text-center text-xl mt-6'>
					Consits of{" "}
					<span className='text-xl text-violet-600 font-bold'>
						{questions.length}
					</span>{" "}
					questions{" "}
				</p>
				<p className='text-center text-xl mt-8 font-bold text-violet-600'>
					Answer honestly 😉
				</p>
				<button
					className='absolute bottom-5 right-6 h-10 px-6 font-semibold rounded-md bg-violet-600 text-white hover:scale-110 transition-all duration-300'
					onClick={() => setShowInitialScreen(false)}
				>
					Next
				</button>
			</div>
		</div>
	);
}

export default Welcome;
