import { getChapters, getChaptersSinceLastUpdate } from '../API/chapters';
import { getCourses, getCoursesSinceLastUpdate } from '../API/courses';
import { getLessons, getLessonsSinceLastUpdate } from '../API/lessons';
import { Chapter, Course, Lesson } from '../DataStructures/LearnModule';
import { chapterData, courseData, lessonData } from '../types/api_interfaces';
import DatabaseManager from './DatabaseManager';

class CourseManager extends DatabaseManager {
	constructor() {
		super();
	}
	initialize = async (token?: string) => {
		const query =
			'CREATE TABLE IF NOT EXISTS courses (id INTEGER PRIMARY KEY NOT NULL, title, icon_name, color, creator_id, rank, visibility, created, modified)';
		await this.databaseInitialize(query);
		if (!token) return;
		const lastUpdateDate = await this.getLastUpdate();
		const coursesData = await getCoursesSinceLastUpdate(
			token,
			lastUpdateDate
		);
		const courses = coursesData.data.map((courseData) => {
			return new Course(courseData);
		});
		this.insertAll(courses);
	};

	add = async (course: Course) => {
		const query =
			'INSERT INTO courses (id, title, icon_name, color, creator_id, rank, visibility, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		const params = [
			course.id,
			course.title,
			course.iconName,
			course.color,
			course.creatorId,
			course.rank,
			course.visibility,
			course.created,
			course.modified,
		];
		return this.transaction(query, params) as Promise<[]>;
	};

	get = async () => {
		const query = 'SELECT * FROM courses';
		return this.transaction(query) as Promise<courseData[]>;
	};

	controlBeforeAdding = async (course: Course) => {
		const exists = await this.exists(course.id);
		if (!exists) {
			return this.add(course);
		}
	};
	exists = async (id: number) => {
		const query = 'SELECT * FROM courses WHERE id=?;';
		const params = [id];
		return (await this.transaction(query, params)).length !== 0;
	};
	insertAll = async (courses: Course[]) => {
		let promises: Promise<[] | undefined>[] = [];
		courses.forEach((course) =>
			promises.push(this.controlBeforeAdding(course))
		);
		return Promise.all(promises);
	};
}

class ChapterManager extends DatabaseManager {
	constructor() {
		super();
	}
	initialize = async (token?: string) => {
		const query =
			'CREATE TABLE IF NOT EXISTS chapters (id INTEGER PRIMARY KEY NOT NULL, title, icon_name, color, creator_id, course_id, rank, visibility, created, modified)';
		await this.databaseInitialize(query);
		if (!token) return;
		const lastUpdateDate = await this.getLastUpdate();
		const chaptersData = await getChaptersSinceLastUpdate(
			token,
			lastUpdateDate
		);
		const chapters = chaptersData.data.map((chapterData) => {
			return new Chapter(chapterData);
		});
		this.insertAll(chapters);
	};

	add = async (chapter: Chapter) => {
		const query =
			'INSERT INTO chapters (id, title, icon_name, color, creator_id, course_id, rank, visibility, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
		const params = [
			chapter.id,
			chapter.title,
			chapter.iconName,
			chapter.color,
			chapter.creatorId,
			chapter.courseId,
			chapter.rank,
			chapter.visibility,
			chapter.created,
			chapter.modified,
		];
		return this.transaction(query, params) as Promise<[]>;
	};

	get = async () => {
		const query = 'SELECT * FROM chapters';
		return this.transaction(query) as Promise<chapterData[]>;
	};
	getByCourseId = async (courseId: number) => {
		const query = 'SELECT * FROM chapters WHERE course_id=?';
		const params = [courseId];
		return this.transaction(query, params) as Promise<chapterData[]>;
	};

	controlBeforeAdding = async (chapter: Chapter) => {
		const exists = await this.exists(chapter.id);
		if (!exists) {
			return this.add(chapter);
		}
	};
	exists = async (id: number) => {
		const query = 'SELECT * FROM chapters WHERE id=?;';
		const params = [id];
		return (await this.transaction(query, params)).length !== 0;
	};
	insertAll = async (chapters: Chapter[]) => {
		let promises: Promise<[] | undefined>[] = [];
		chapters.forEach((chapter) =>
			promises.push(this.controlBeforeAdding(chapter))
		);
		return Promise.all(promises);
	};
}

class LessonManager extends DatabaseManager {
	constructor() {
		super();
	}
	initialize = async (token?: string) => {
		const query =
			'CREATE TABLE IF NOT EXISTS lessons (id INTEGER PRIMARY KEY NOT NULL, title, chapter_id, creator_id, rank, visibility, created, modified)';
		await this.databaseInitialize(query);
		if (!token) return;
		const lastUpdateDate = await this.getLastUpdate();
		const lessonsData = await getLessonsSinceLastUpdate(
			token,
			lastUpdateDate
		);
		const lessons = lessonsData.data.map((lessonData) => {
			return new Lesson(lessonData);
		});
		this.insertAll(lessons);
	};

	add = async (lesson: Lesson) => {
		const query =
			'INSERT INTO lessons (id, title, chapter_id, creator_id, rank, visibility, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
		const params = [
			lesson.id,
			lesson.title,
			lesson.chapterId,
			lesson.creatorId,
			lesson.rank,
			lesson.visibility,
			lesson.created,
			lesson.modified,
		];
		return this.transaction(query, params) as Promise<[]>;
	};

	get = async () => {
		const query = 'SELECT * FROM lessons';
		return this.transaction(query) as Promise<lessonData[]>;
	};
	getByChapterId = async (chapterId: number) => {
		const query = 'SELECT * FROM lessons WHERE chapter_id=?';
		const params = [chapterId];
		return this.transaction(query, params) as Promise<lessonData[]>;
	};

	controlBeforeAdding = async (lesson: Lesson) => {
		const exists = await this.exists(lesson.id);
		if (!exists) {
			return this.add(lesson);
		}
	};
	exists = async (id: number) => {
		const query = 'SELECT * FROM lessons WHERE id=?;';
		const params = [id];
		return (await this.transaction(query, params)).length !== 0;
	};
	insertAll = async (lessons: Lesson[]) => {
		let promises: Promise<[] | undefined>[] = [];
		lessons.forEach((lesson) =>
			promises.push(this.controlBeforeAdding(lesson))
		);
		return Promise.all(promises);
	};
}

export { CourseManager, ChapterManager, LessonManager };
