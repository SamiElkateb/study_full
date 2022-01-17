import { LessonManager } from '../database/LearnModuleManager';
import isIconName from '../helpers/data_testing/isIconName';
import { chapterData, courseData, lessonData } from '../types/api_interfaces';
import { iconNames } from '../types/types';

class LearnModule {
	readonly id: number;
	readonly title: string;
	readonly creatorId: number;
	readonly rank: number;
	readonly visibility: number;
	readonly created: string;
	readonly modified: string;

	constructor(props: courseData | chapterData | lessonData) {
		const { id, title, creator_id, rank, visibility, created, modified } =
			props;

		this.id = id;
		this.title = title;
		this.creatorId = +creator_id;
		this.rank = +rank;
		this.visibility = +visibility;
		this.created = created;
		this.modified = modified;
	}
}
interface completionCourseData extends courseData {
	completionPercent?: number;
}

class Course extends LearnModule {
	readonly iconName: iconNames;
	readonly color: string;
	readonly completionPercent?: number;
	constructor(props: completionCourseData) {
		super(props);
		const { icon_name, color, completionPercent } = props;
		this.color = color;
		this.completionPercent = completionPercent;
		if (isIconName(icon_name)) {
			this.iconName = icon_name as iconNames;
		} else {
			this.iconName = 'square';
		}
	}
}
interface completionChapterData extends chapterData {
	completionPercent?: number;
}

class Chapter extends LearnModule {
	readonly courseId: number;
	readonly iconName: iconNames;
	readonly color: string;
	readonly completionPercent?: number;
	constructor(props: completionChapterData) {
		super(props);
		const { icon_name, color, course_id, completionPercent } = props;
		this.courseId = +course_id;
		this.color = color;
		this.completionPercent = completionPercent;
		if (isIconName(icon_name)) {
			this.iconName = icon_name as iconNames;
		} else {
			this.iconName = 'square';
		}
	}
}
interface isCompletedLessonData extends lessonData {
	isCompleted?: boolean;
}

class Lesson extends LearnModule {
	readonly chapterId: number;
	isCompleted?: boolean;
	constructor(props: isCompletedLessonData) {
		super(props);
		const { chapter_id, isCompleted } = props;
		this.chapterId = +chapter_id;
		this.isCompleted = isCompleted;
	}
}

export { Course, Chapter, Lesson };
