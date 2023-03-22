import { useEffect } from "react";
import "./App.css";
import Loading from "./components/Loading";
import Result from "./components/Result";
import Welcome from "./components/Welcome";
import { API_ENDPOINT, useGlobalContext } from "./context/context";
import { Rotate, Fade } from "react-reveal";

var summer = 0;

function App() {
	const {
		fetchApi,
		questions,
		options,
		index,
		nextQuestion,
		loading,
		showInitialScreen,
		isAnsWait,
		setIsAnsWait,
		logHere,
		marking,
		displayNormalButtonView,
		isResultReady,
		setIsResultReady,
		scoreWiseParas,
	} = useGlobalContext();

	useEffect(() => {
		// fetchApi(`${API_ENDPOINT}/questions`, "questions");
		// fetchApi(`${API_ENDPOINT}/optionList`, "options");
		// fetchApi(`${API_ENDPOINT}/paraList`, "paras");

		fetchApi("questions");
		fetchApi("options");
		fetchApi("paras");
	}, []);

	if (index === 29) {
		console.log(marking);
		console.log(scoreWiseParas);
	}

	if (loading && questions.length === 0) {
		return <Loading />;
	}

	if (showInitialScreen && !loading) {
		return (
			<Rotate top left>
				<Welcome />
			</Rotate>
		);
	}

	if (isResultReady && Object.keys(marking).length) {
		return <Result />;
	}

	if (!showInitialScreen && questions && questions.length) {
		return (
			<main className='min-h-screen flex items-center justify-center'>
				<div className='relative p-3 py-5 md:p-8 bg-white shadow-2xl rounded-lg max-w-[800px] w-11/12 min-h-[300px]'>
					<p className='text-center pb-2 text-violet-600'>
						Question{" "}
						<span>
							<span className='font-bold text-xl'>{index + 1}</span> /{" "}
							{questions.length}
						</span>
					</p>
					<div className='mt-3'>
						<p
							className='text-center font-light text-lg sm:text-xl'
							dangerouslySetInnerHTML={{
								__html: questions[index].questionText,
							}}
						/>
						<Fade cascade>
							<div className='grid grid-cols-1 my-10 space-y-2 place-content-center'>
								{options.map((option, optionIndex) => {
									return (
										<button
											disabled={isAnsWait.state === true}
											onClick={() => {
												const selectedOptionValue = 5 - optionIndex;
												summer += selectedOptionValue;
												if ((index + 1) % 6 === 0) {
													// question | from
													// question | to
													// question | value of selected option
													logHere(Math.abs(6 - index - 1), index, summer);
													summer = 0;
												}

												setIsAnsWait((prevState) => {
													return {
														...prevState,
														state: true,
														index: optionIndex,
													};
												});

												if (index !== questions.length - 1) {
													setTimeout(() => {
														nextQuestion();
													}, 1000);
												} else {
													setIsResultReady(true);
													displayNormalButtonView();
												}
											}}
											key={optionIndex}
											className={`${
												isAnsWait.state === true &&
												isAnsWait.index === optionIndex
													? "bg-black scale-y-110"
													: "bg-violet-600"
											} ${
												isAnsWait.state === true &&
												isAnsWait.index !== optionIndex
													? "bg-violet-500"
													: "hover:scale-y-110 transition-all duration-150"
											}  w-4/5 rounded-lg mx-auto text-white p-2 text-sm`}
											dangerouslySetInnerHTML={{
												__html: option,
											}}
										/>
									);
								})}
							</div>
						</Fade>
					</div>
				</div>
			</main>
		);
	}
}

export default App;
