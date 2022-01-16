import { Course } from '../DataStructures/LearnModule';
import DatabaseManager from './DatabaseManager';

class CourseManager extends DatabaseManager {
	constructor() {
		super();
		this.initialize();
	}
	initialize = async () => {
		const query =
			'CREATE TABLE IF NOT EXISTS card (id INTEGER PRIMARY KEY NOT NULL, lessonId, question, answer)';
		return this.databaseInitialize(query);
	};

	add = async (course: Course) => {
		const query =
			'INSERT INTO card (id, lessonId, question, answer) VALUES (?,?,?,?)';
		const params = [course.id, course.iconName];
		return this.transaction(query, params);
	};
	get = async (course: Course) => {
		const query =
			'INSERT INTO card (id, lessonId, question, answer) VALUES (?,?,?,?)';
		const params = [course.id, course.iconName];
		return this.transaction(query, params);
	};
}

class ChapterManager extends DatabaseManager {
	constructor() {
		super();
	}
}

class LessonManager extends DatabaseManager {
	constructor() {
		super();
	}
}

export { CourseManager, ChapterManager, LessonManager };
