/** @format */

import isIconName from '../helpers/data_testing/isIconName';
import { iconNames } from '../types';

interface course {
	id: number;
	title: string;
	icon_name: string;
	creator_id: number | string;
	rank: number | string;
	visibility: number | string;
    color: string;
}
class Course {
	readonly id: number;
	readonly title: string;
	readonly iconName: iconNames;
	readonly creatorId: number;
	readonly rank: number;
	readonly color: string;
	readonly visibility: number;

	constructor(props: course) {
		const { id, title, icon_name, creator_id, rank, visibility, color } = props;
		this.id = id;
		this.title = title;
		this.creatorId = +creator_id;
		this.rank = +rank;
		this.color = color;
		this.visibility = +visibility;
		if (isIconName(icon_name)) {
			this.iconName = icon_name as iconNames;
		} else {
			this.iconName = 'square';
		}
	}
}
export default Course;
