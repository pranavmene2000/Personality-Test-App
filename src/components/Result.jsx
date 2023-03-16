import React from "react";
import { useGlobalContext } from "../context/context";
import { Zoom, Fade } from "react-reveal";

const _between = (x, min, max) => {
	return x >= min && x <= max;
};

const getPara = (value) => {
	if (_between(value, 0, 10)) {
		return 0 + "_" + 10;
	}
	if (_between(value, 11, 20)) {
		return 11 + "_" + 20;
	}
	if (_between(value, 21, 30)) {
		return 21 + "_" + 30;
	}
};

function Result() {
	const { paras, marking } = useGlobalContext();

	return (
		<div className='min-h-screen flex items-center justify-center '>
			<div className='relative p-3 xl:my-0 my-5 md:p-8 bg-white shadow rounded-lg max-w-[1200px] w-11/12 min-h-[300px]'>
				<Fade>
					<p className='text-center text-3xl font-bold'>
						Examine the results below to evaluate yourself
					</p>
				</Fade>
				<Zoom left cascade>
					<div className='flex flex-col space-y-4 pt-6'>
						{marking &&
							Object.entries(marking).map(([marksRange, marksValue], index) => {
								const paragraph = getPara(marksValue);
								return (
									<div
										key={index}
										className='bg-gray-100 border-slate-100 border-b rounded-md p-4 '
									>
										<p className='text-violet-600 font-bold'>
											For question number ranged from{" "}
											<span className='text-bold text-black'>
												{parseInt(marksRange.split("_")[0]) + 1}
											</span>{" "}
											to{" "}
											<span className='text-bold text-black'>
												{parseInt(marksRange.split("_")[1]) + 1}
											</span>
										</p>
										<p className='pt-2 text-sm'>{paras[paragraph]}</p>
									</div>
								);
							})}
					</div>
				</Zoom>
			</div>
		</div>
	);
}

export default Result;
