import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";

// export const API_ENDPOINT = "http://localhost:3000";

const _decidedPara = (score) => {
	if (score <= 10 && score > 0) {
		return "para_A";
	}
	if (score <= 20 && score > 10) {
		return "para_B";
	}
	if (score <= 30 && score > 20) {
		return "para_C";
	}
};

function revisedRandId() {
	return Math.random()
		.toString(36)
		.replace(/[^a-z]+/g, "")
		.substr(2, 10);
}

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const [showInitialScreen, setShowInitialScreen] = useState(true);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [index, setIndex] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [options, setOptions] = useState([]);
	const [paras, setParas] = useState([]);
	const [totalScoreParas, setTotalScoreParas] = useState([]);
	const [isAnsWait, setIsAnsWait] = useState({
		state: false,
		index: -99999,
	});
	const [marking, setMarking] = useState({});
	const [scoreWiseParas, setScoreWiseParas] = useState([]);
	const [isResultReady, setIsResultReady] = useState(false);

	console.log(index);

	const logHere = (...args) => {
		const to = args[1];
		const from = args[0];

		const from_to_string = `${from + "_" + to}`;

		console.log(args, from_to_string);

		const para = _decidedPara(parseInt(args[2]));

		if ((to + 1) % 6 === 0) {
			// question | value of selected option
			// question | to
			// question | from

			console.log(_decidedPara(args[2]));

			setScoreWiseParas((prevState) => {
				return [
					...prevState,
					{
						id: revisedRandId(),
						paraName: para,
						paraFor: from_to_string,
						score: parseInt(args[2]),
					},
				];
			});

			setMarking((prevState) => {
				return {
					...prevState,
					[from_to_string]: args[2],
				};
			});
		}
	};

	const fetchApi = async (type) => {
		setLoading(true);

		try {
			const { data } = await axios.get("/db.json");
			console.log("====================================");
			console.log(data);
			console.log("====================================");
			if (type === "questions") {
				setQuestions(data["questions"]);
			} else if (type === "options") {
				setOptions(data["optionList"]);
			} else if (type === "paras") {
				setParas(data["paraList"]);
			} else if (type === "scoreParas") {
				setTotalScoreParas(data["totalScoreParas"]);
			}
			setLoading(false);
			setError(false);
		} catch (error) {
			console.error(error);
			setLoading(false);
			setError(false);
		}
	};

	const nextQuestion = () => {
		setIndex((prevIndex) => {
			if (prevIndex < questions.length - 1) {
				return prevIndex + 1;
			}
			console.log("The End!!!");
			return;
		});
		displayNormalButtonView();
	};

	const displayNormalButtonView = () => {
		setIsAnsWait((prevState) => {
			return {
				...prevState,
				state: false,
				index: -99999,
			};
		});
	};

	return (
		<AppContext.Provider
			value={{
				loading,
				index,
				questions,
				options,
				error,
				nextQuestion,
				fetchApi,
				showInitialScreen,
				setShowInitialScreen,
				isAnsWait,
				setIsAnsWait,
				marking,
				setMarking,
				logHere,
				displayNormalButtonView,
				isResultReady,
				setIsResultReady,
				paras,
				setParas,
				scoreWiseParas,
				totalScoreParas,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppProvider;

export const useGlobalContext = () => {
	return useContext(AppContext);
};
