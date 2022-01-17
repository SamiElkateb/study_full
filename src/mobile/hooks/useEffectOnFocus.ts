import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const useEffectOnFocus = (effect: () => void) => {
	const navigation = useNavigation();
	useEffect(() => {
		const unsubscribe = navigation.addListener('focus', effect);
		return unsubscribe;
	}, [navigation]);
	useEffect(() => {
		effect();
	}, []);
};
export default useEffectOnFocus;
