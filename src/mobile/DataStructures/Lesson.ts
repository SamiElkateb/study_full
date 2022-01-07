import { lessonData } from '../types/api_interfaces';

class Lesson {
	readonly id: number;
	readonly title: string;
	readonly creatorId: number;
	readonly chapterId: number;
	readonly rank: number;
	readonly visibility: number;

	constructor(props: lessonData) {
		const { id, title, creator_id, chapter_id, rank, visibility } = props;

		this.id = id;
		this.title = title;
		this.creatorId = +creator_id;
		this.chapterId = +chapter_id;
		this.rank = +rank;
		this.visibility = +visibility;
	}
}
export default Lesson;
