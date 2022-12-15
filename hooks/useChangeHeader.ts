import { useEffect } from 'react';
import { changeHeader, initHeader } from 'stores/slices/ui-slice';
import { useDispatch } from 'react-redux';
import { HeaderType } from 'types/header';

const useChangeHeader = (headerType: HeaderType, isButtonVisible = false) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(changeHeader({ headerType, isButtonVisible }));
		return () => {
			dispatch(initHeader());
		};
	}, [isButtonVisible]);
};

export default useChangeHeader;
