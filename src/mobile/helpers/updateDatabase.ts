import DatabaseManager from '../database/DatabaseManager';
import FlashcardManager from '../database/FlashcardManager';
import {
	ChapterManager,
	CourseManager,
	LessonManager,
} from '../database/LearnModuleManager';
import StudyManager from '../database/StudyManager';
import UserManager from '../database/UserManager';

const updateDatabase = async () => {
	const databaseManager = new DatabaseManager();
	const userManager = new UserManager();
	const flashcardManager = new FlashcardManager();
	const courseManager = new CourseManager();
	const chapterManager = new ChapterManager();
	const lessonManager = new LessonManager();
	const studyManager = new StudyManager();
	await databaseManager.initialize();
	await userManager.initialize();
	const { token } = (await userManager.get())[0];
	await flashcardManager.initialize(token);
	await courseManager.initialize(token);
	await chapterManager.initialize(token);
	await lessonManager.initialize(token);
	await studyManager.initialize();
	await databaseManager.setLastUpdate();
};
export default updateDatabase;
