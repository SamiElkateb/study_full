import { getFlashcards, getFlashcardsSinceLastUpdate } from '../API/flashcards';
import Flashcard from '../DataStructures/Flashcard';
import { flashcardData } from '../types/api_interfaces';
import DatabaseManager from './DatabaseManager';
class FlashcardManager extends DatabaseManager {
	private ready: Promise<unknown>;
	constructor() {
		super();
		this.ready = this.initialize();
	}
	initialize = async (token?: string) => {
		const query =
			'CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY NOT NULL, question, answer, answer_type, lesson_id, creator_id, visibility, created, modified)';
		await this.databaseInitialize(query);
		if (!token) return;
		const lastUpdateDate = await this.getLastUpdate();
		const flashcardsData = await getFlashcardsSinceLastUpdate(
			token,
			lastUpdateDate
		);
		this.insertAll(flashcardsData.data);
	};
	add = async (flashcardData: flashcardData): Promise<[]> => {
		await this.ready;
		const query =
			'INSERT INTO flashcards (id, question, answer, answer_type, lesson_id, creator_id, visibility, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
		const params = [
			flashcardData.id,
			flashcardData.question,
			flashcardData.answer,
			flashcardData.answer_type,
			flashcardData.lesson_id,
			flashcardData.creator_id,
			flashcardData.visibility,
			flashcardData.created,
			flashcardData.modified,
		];
		return this.transaction(query, params) as Promise<[]>;
	};
	get = async (): Promise<flashcardData[]> => {
		await this.ready;
		const query = 'SELECT * FROM flashcards';
		return this.transaction(query) as Promise<flashcardData[]>;
	};

	getByLessonId = async (lessonId: number) => {
		const query = 'SELECT * FROM flashcards WHERE lesson_id=?';
		const params = [lessonId];
		return this.transaction(query, params) as Promise<flashcardData[]>;
	};

	delete = async () => {
		await this.ready;
		const query = 'DELETE FROM flashcards';
		return this.transaction(query);
	};
	controlBeforeAdding = async (flashcard: flashcardData) => {
		const exists = await this.exists(flashcard.id);
		if (!exists) {
			return this.add(flashcard);
		}
	};
	exists = async (id: number) => {
		const query = 'SELECT * FROM flashcards WHERE id=?;';
		const params = [id];
		return (await this.transaction(query, params)).length !== 0;
	};
	insertAll = async (flashcards: flashcardData[]) => {
		let promises: Promise<[] | undefined>[] = [];
		flashcards.forEach((flashcard) =>
			promises.push(this.controlBeforeAdding(flashcard))
		);
		return Promise.all(promises);
	};
}

export default FlashcardManager;
