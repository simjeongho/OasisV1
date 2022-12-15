import { useState, useEffect, useMemo } from 'react';

const useImageSize = (src: string | undefined) => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const image = useMemo(() => (typeof window !== 'undefined' ? new Image() : null), []);

	const setImageSize = () => {
		if (image) {
			setWidth(image.width);
			setHeight(image.height);
		}
	};

	useEffect(() => {
		image && image.addEventListener('load', setImageSize);
		return () => {
			image && image.removeEventListener('load', setImageSize);
		};
	}, [image, src]);

	useEffect(() => {
		if (image && src) {
			image.src = src;
		}
	}, [image, src]);

	return width >= height;
};

export default useImageSize;
