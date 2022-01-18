import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { AuthContextProvider } from './Context/AuthContext';

export default function App() {
	const isLoadingComplete = useCachedResources();
	const colorScheme = useColorScheme();

	if (!isLoadingComplete) {
		return null;
	}
	return (
		<AuthContextProvider>
			<SafeAreaProvider>
				<Navigation colorScheme={colorScheme} />
				<StatusBar />
			</SafeAreaProvider>
		</AuthContextProvider>
	);
}
