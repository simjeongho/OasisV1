import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

const useInput = <T = any>(initialValue: T, type = 'text'): ReturnTypes<T> => {
	const [value, setValue] = useState(initialValue);
	const handler = useCallback((e: any) => {
		setValue(type === 'text' ? e.target.value : e.target.checked);
	}, []);
	return [value, handler, setValue];
};

export default useInput;
