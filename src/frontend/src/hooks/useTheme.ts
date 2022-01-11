import { useCallback, useEffect, useState } from 'react';
type themes = 'light' | 'dark';
const useTheme = (initialTheme?: themes) => {
	const watchTheme =
		window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');

	const isDarkTheme = watchTheme.matches;
	const didInitializeTheme = typeof initialTheme !== 'undefined';

	const initialBrowserTheme = isDarkTheme ? 'dark' : 'light';
	const initialUserTheme = initialTheme ? initialTheme : initialBrowserTheme;

	const [browserTheme, setBrowserTheme] =
		useState<themes>(initialBrowserTheme);

	const [userTheme, setUserTheme] = useState<themes>(initialUserTheme);

	const [userDidChooseTheme, setUserDidChooseTheme] =
		useState(didInitializeTheme);

	const theme = userDidChooseTheme ? userTheme : browserTheme;
	const browserThemeChangeHandler = useCallback(
		(event: MediaQueryListEvent) => {
			const newTheme = event.matches ? 'dark' : 'light';
			setBrowserTheme(newTheme);
		},
		[]
	);
	const userThemeToggleHandler = () => {
		setUserTheme((prevState) => {
			if (prevState === 'light') return 'dark';
			return 'light';
		});
		setUserDidChooseTheme(true);
	};

	useEffect(() => {
		watchTheme.addEventListener('change', browserThemeChangeHandler);
		return () => {
			watchTheme.removeEventListener('change', browserThemeChangeHandler);
		};
	}, [watchTheme]);

	return { theme, toggleTheme: userThemeToggleHandler };
};
export default useTheme;
