/** @format */

import { AntDesign, Entypo, Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheetProperties } from 'react-native';
import { iconSizes } from '../../constants/Size';
import { iconNames, sizes } from '../../types';
interface props {
	name: iconNames;
	size: sizes;
	color: string;
}
const Icon: React.FC<props> = (props) => {
	const { name, size, color } = props;

	const iconSize = iconSizes[size];
	if (name === 'calendar') {
		return (
			<Ionicons name="ios-today-sharp" color={color} size={iconSize} />
		);
	}

	if (name === 'trophy') {
		return (
			<Ionicons name="ios-trophy-sharp" color={color} size={iconSize} />
		);
	}
	if (name === 'curved-flag') {
		return <Entypo name="flag" color={color} size={iconSize} />;
	}
	if (name === 'sql') {
		return <MaterialCommunityIcons name="database-search" color={color} size={iconSize} />;
	}
	if (name === 'git') {
		return <Feather name="git-merge" color={color} size={iconSize} />;
	}
	if (name === 'javascript') {
		return <Ionicons name="logo-javascript" color={color} size={iconSize} />;
	}
	if (name === 'css') {
		return <Ionicons name="logo-css3" color={color} size={iconSize} />;
	}
	if (name === 'sass') {
		return <Ionicons name="logo-sass" color={color} size={iconSize} />;
	}
	if (name === 'typescript') {
		return <MaterialCommunityIcons name="language-typescript" color={color} size={iconSize} />;
	}
	if (name === 'docker') {
		return <FontAwesome5 name="docker" color={color} size={iconSize} />;
	}
	if (name === 'kubernetes') {
		return <MaterialCommunityIcons name="kubernetes" color={color} size={iconSize} />;
	}
	if (name === 'html') {
		return <AntDesign name={'HTML'} color={color} size={iconSize} />;
	}
	if (name === 'done') {
		return <Feather name="check-circle" color={color} size={iconSize} />;
	}

	return <AntDesign name={name} color={color} size={iconSize} />;
};
export default Icon;
