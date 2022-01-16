import { flashcardData } from '../types/api_interfaces';
import DatabaseManager from './DatabaseManager';
class StudyManager extends DatabaseManager {
	private ready: Promise<unknown>;
	constructor() {
		super();
		this.ready = this.initialize();
	}
	initialize = async () => {
		const query =
			'CREATE TABLE IF NOT EXISTS study (id INTEGER PRIMARY KEY NOT NULL, card_id, lesson_id, next_study_date, streak)';
		return this.databaseInitialize(query);
	};
	add = async (studyData: any): Promise<[]> => {
		await this.ready;
		const query =
			'INSERT INTO study (id, card_id, lesson_id, next_study_date, streak, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?)';
		const params = [
			studyData.id,
			studyData.card_id,
			studyData.lesson_id,
			studyData.next_study_date,
			studyData.streak,
			studyData.created,
			studyData.modified,
		];
		return this.transaction(query, params) as Promise<[]>;
	};
	get = async (): Promise<flashcardData[]> => {
		await this.ready;
		const query = 'SELECT * FROM study';
		return this.transaction(query) as Promise<flashcardData[]>;
	};
	delete = async () => {
		await this.ready;
		const query = 'DELETE FROM study';
		return this.transaction(query);
	};
	insertAll = async (cards: flashcardData[]) => {
		await this.ready;
		let promises: Promise<[]>[] = [];
		cards.forEach((card) => promises.push(this.add(card)));
		return Promise.all(promises);
	};
}

export default StudyManager;
