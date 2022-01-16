import { flashcardData } from '../types/api_interfaces';
import DatabaseManager from './DatabaseManager';
class FlashcardManager extends DatabaseManager {
	private ready: Promise<unknown>;
	constructor() {
		super();
		this.ready = this.initialize();
	}
	initialize = async () => {
		const query =
			'CREATE TABLE IF NOT EXISTS flashcards (id INTEGER PRIMARY KEY NOT NULL, question, answer, answer_type, lesson_id, creator_id, visibility, created, modified)';
		return this.databaseInitialize(query);
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
	delete = async () => {
		await this.ready;
		const query = 'DELETE FROM flashcards';
		return this.transaction(query);
	};
	insertAll = async (flashcards: flashcardData[]) => {
		await this.ready;
		let promises: Promise<[]>[] = [];
		flashcards.forEach((flashcard) => promises.push(this.add(flashcard)));
		return Promise.all(promises);
	};
}

export default FlashcardManager;
