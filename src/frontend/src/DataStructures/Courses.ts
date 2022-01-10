import isIconName from '../helpers/data_testing/isIconName';
import { courseData } from '../types/api_interfaces';
import { iconNames } from '../types/types';

class Course {
	readonly id: number;
	readonly title: string;
	readonly iconName: iconNames;
	readonly creatorId: number;
	readonly rank: number;
	readonly color: string;
	readonly visibility: number;

	constructor(props: courseData) {
		const { id, title, icon_name, creator_id, rank, visibility, color } =
			props;

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
