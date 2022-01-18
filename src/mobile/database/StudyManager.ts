import moment from 'moment';
import { flashcardData } from '../types/api_interfaces';
import DatabaseManager from './DatabaseManager';
interface StudyData {
	flashcard_id: number;
	next_study_date: string;
	streak: number;
}

class StudyManager extends DatabaseManager {
	constructor() {
		super();
	}
	initialize = async () => {
		const query =
			'CREATE TABLE IF NOT EXISTS study (id INTEGER PRIMARY KEY NOT NULL, flashcard_id INTEGER, next_study_date TEXT, streak INTEGER, created TEXT DEFAULT CURRENT_TIMESTAMP, modified TEXT DEFAULT CURRENT_TIMESTAMP)';
		await this.databaseInitialize(query);
	};
	add = async (studyData: StudyData): Promise<[]> => {
		const query =
			'INSERT INTO study (flashcard_id, next_study_date, streak) VALUES (?, ?, ?)';
		const params = [
			studyData.flashcard_id,
			studyData.next_study_date,
			studyData.streak,
		];
		return this.transaction(query, params) as Promise<[]>;
	};
	update = async (studyData: StudyData): Promise<[]> => {
		const query =
			'UPDATE study SET next_study_date = ?, streak = ? WHERE flashcard_id = ?;';
		const params = [
			studyData.next_study_date,
			studyData.streak,
			studyData.flashcard_id,
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
	getTomorrow = async (): Promise<flashcardData[]> => {
		const today = new Date();
		const tomorrow = new Date().setDate(today.getDate() + 1);
		const query = `SELECT * FROM study 
			INNER JOIN flashcards ON study.flashcard_id = flashcards.id
			WHERE next_study_date<=date(?) ORDER BY lesson_id;`;
		const params = [moment(tomorrow).format('YYYY-MM-DD')];
		return this.transaction(query, params) as Promise<flashcardData[]>;
	};
	getMastered = async (): Promise<flashcardData[]> => {
		const query = 'SELECT * FROM study WHERE streak>=3';
		return this.transaction(query) as Promise<flashcardData[]>;
	};
	delete = async () => {
		const query = 'DELETE FROM study';
		return this.transaction(query);
	};
	insertAll = async (cards: StudyData[]) => {
		let promises: Promise<[]>[] = [];
		cards.forEach((card) => promises.push(this.add(card)));
		return Promise.all(promises);
	};
	controlBeforeAdding = async (studyData: StudyData) => {
		const exists = await this.exists(studyData.flashcard_id);
		if (exists) return this.update(studyData);
		if (!exists) return this.add(studyData);
	};
	exists = async (flashcardId: number) => {
		const query = 'SELECT * FROM study WHERE flashcard_id=?';
		const params = [flashcardId];
		return (await this.transaction(query, params)).length !== 0;
	};
	studied = async (studyData: StudyData) => {
		return this.controlBeforeAdding(studyData);
	};
}

export default StudyManager;
