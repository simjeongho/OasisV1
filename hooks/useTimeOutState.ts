import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { ALERT_TIME_OUT } from 'constants/alert';

type ReturnTypes = [boolean, Dispatch<SetStateAction<boolean>>];

const useTimeOutState = (time?: number): ReturnTypes => {
	const [state, setState] = useState(false);

	useEffect(() => {
		if (state) {
			const timeout = setTimeout(() => setState(false), time || ALERT_TIME_OUT);

			return () => clearTimeout(timeout);
		}
	}, [time, state]);

	return [state, setState];
};

export default useTimeOutState;
