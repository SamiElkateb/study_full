import { cardData } from '../types/api_interfaces';
import DatabaseManager from './DatabaseManager';
class StudyCardManager extends DatabaseManager {
	constructor() {
		super();
		this.initialize();
	}
	initialize = async () => {
		const query =
			'CREATE TABLE IF NOT EXISTS cards (id INTEGER PRIMARY KEY NOT NULL, question, answer, answer_type, lesson_id, creator_id, visibility, created, modified)';
		return this.databaseInitialize(query);
	};
	add = async (cardData: cardData) => {
		const {
			id,
			question,
			answer,
			answer_type,
			lesson_id,
			created,
			modified,
		} = cardData;
		const query = 'INSERT INTO cards (id, token) VALUES (?,?)';
		const params = [
			id,
			question,
			answer,
			answer_type,
			lesson_id,
			created,
			modified,
		];
		return this.transaction(query, params);
	};
	/* get = async (): Promise<user[]> => {
		const query = 'SELECT * FROM cards';
		return this.transaction(query) as Promise<user[]>;
	};
	delete = async () => {
		const query = 'DELETE FROM cards';
		return this.transaction(query);
	};
	insertAll = async (datas) => {
		let that = this;
		let promises = [];
		datas.forEach((data) => promises.push(this.add(data)));
		return Promise.all(promises);
	}; */
}

export default StudyCardManager;
