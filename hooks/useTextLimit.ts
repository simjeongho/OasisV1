import { Dispatch, SetStateAction, useMemo, useEffect } from 'react';

const useTextLimit = (input: string, setInput: Dispatch<SetStateAction<string>>, limit: number) => {
	const numberOfLetters = useMemo(
		() => input.length,

		[input],
	);

	const limitNumberOfLetters = () => {
		if (numberOfLetters >= limit) {
			setInput((prev) => prev.slice(0, limit));
		}
	};

	useEffect(() => {
		limitNumberOfLetters();
	}, [input]);

	return numberOfLetters;
};

export default useTextLimit;
