import isIconName from '../helpers/data_testing/isIconName';
import { chapterData, courseData, lessonData } from '../types/api_interfaces';
import { iconNamesType } from '../types/types';

class LearnModule {
	readonly id: number;
	readonly title: string;
	readonly creatorId: number;
	readonly rank: number;
	readonly visibility: number;

	constructor(props: courseData | chapterData | lessonData) {
		const { id, title, creator_id, rank, visibility } = props;
		this.id = id;
		this.title = title;
		this.creatorId = +creator_id;
		this.rank = +rank;
		this.visibility = +visibility;
	}
}

class Course extends LearnModule {
	readonly iconName: iconNamesType;
	readonly color: string;
	constructor(props: courseData) {
		super(props);
		const { icon_name, color } = props;
		this.color = color;
		if (isIconName(icon_name)) {
			this.iconName = icon_name as iconNamesType;
		} else {
			this.iconName = 'square';
		}
	}
}

class Chapter extends LearnModule {
	readonly courseId: number;
	readonly iconName: iconNamesType;
	readonly color: string;
	constructor(props: chapterData) {
		super(props);
		const { icon_name, color, course_id } = props;
		this.courseId = +course_id;
		this.color = color;
		if (isIconName(icon_name)) {
			this.iconName = icon_name as iconNamesType;
		} else {
			this.iconName = 'square';
		}
	}
}

class Lesson extends LearnModule {
	readonly chapterId: number;
	constructor(props: lessonData) {
		super(props);
		const { chapter_id } = props;
		this.chapterId = +chapter_id;
	}
}

export { Course, Chapter, Lesson };
