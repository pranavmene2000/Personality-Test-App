import React from "react";
import { useGlobalContext } from "../context/context";
import { Zoom, Fade } from "react-reveal";

const _decidedPara = (score) => {
	if (score <= 50 && score >= 0) {
		return "para_A";
	}
	if (score <= 100 && score > 50) {
		return "para_B";
	}
	if (score <= 150 && score > 100) {
		return "para_C";
	}
};

function Result() {
	const { paras, marking, scoreWiseParas, totalScoreParas } =
		useGlobalContext();

	const total_score = [...scoreWiseParas].reduce((acc, curr) => {
		return curr["score"] + acc;
	}, 0);

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
							[...scoreWiseParas].map(({ id, paraName, paraFor }) => {
								const paragraph = paras[paraFor][paraName];
								console.log("====================================");
								console.log(paragraph);
								console.log("====================================");
								return (
									<div
										key={id}
										className='bg-gray-100 border-slate-100 border-b rounded-md p-4'
									>
										<p className='text-sm'>{paragraph}</p>
									</div>
								);
							})}
						<div className='bg-gray-300 border-slate-100 border-b rounded-md p-4'>
							<p className='pt-2 text-sm'>
								"{totalScoreParas[_decidedPara(total_score / 3)]}"
							</p>
						</div>
					</div>
				</Zoom>
			</div>
		</div>
	);
}

export default Result;
