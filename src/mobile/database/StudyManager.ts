import moment from 'moment';
import { flashcardData } from '../types/api_interfaces';
import DatabaseManager from './DatabaseManager';
class StudyManager extends DatabaseManager {
	constructor() {
		super();
	}
	initialize = async () => {
		const query =
			'CREATE TABLE IF NOT EXISTS study (id INTEGER PRIMARY KEY NOT NULL, flashcard_id, next_study_date, streak)';
		await this.databaseInitialize(query);
	};
	add = async (studyData: any): Promise<[]> => {
		const query =
			'INSERT INTO study (id, flashcard_id, next_study_date, streak, created, modified) VALUES (?, ?, ?, ?, ?, ?, ?)';
		const params = [
			studyData.id,
			studyData.flashcard_id,
			studyData.next_study_date,
			studyData.streak,
			studyData.created,
			studyData.modified,
		];
		return this.transaction(query, params) as Promise<[]>;
	};
	get = async (): Promise<flashcardData[]> => {
		const query = 'SELECT * FROM study';
		return this.transaction(query) as Promise<flashcardData[]>;
	};
	getToday = async (): Promise<flashcardData[]> => {
		const today = new Date();
		const query = `SELECT * FROM study 
			INNER JOIN flashcards ON study.flashcard_id = flashcards.id
			WHERE next_study_date<=date(?) ORDER BY lesson_id;`;
		const params = [moment(today).format('YYYY-MM-DD')];
		return this.transaction(query, params) as Promise<flashcardData[]>;
	};
	delete = async () => {
		const query = 'DELETE FROM study';
		return this.transaction(query);
	};
	insertAll = async (cards: flashcardData[]) => {
		let promises: Promise<[]>[] = [];
		cards.forEach((card) => promises.push(this.add(card)));
		return Promise.all(promises);
	};
}

export default StudyManager;
