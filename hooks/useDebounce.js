import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		// Set a timer to update the debounced value after the specified delay
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Clear the timer if the value changes within the delay time
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedValue;
}

export default useDebounce;
