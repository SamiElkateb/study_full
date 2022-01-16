import * as SQLite from 'expo-sqlite';
import { Course } from '../DataStructures/LearnModule';

type queryParams = (string | number)[];
type lastUpdateRow = {
	id: string;
	date: string;
};
class DatabaseManager {
	protected db: SQLite.WebSQLDatabase;
	constructor() {
		this.db = SQLite.openDatabase('data.db');
	}
	initialize = async () => {
		const query =
			'CREATE TABLE IF NOT EXISTS lastUpdate (id INTEGER PRIMARY KEY NOT NULL, date)';
		await this.databaseInitialize(query);
	};
	setLastUpdate = async () => {
		const deleteQuery = 'DELETE FROM lastUpdate';
		await this.transaction(deleteQuery);
		const query = 'INSERT INTO lastUpdate (date) VALUES (?)';
		const lastUpdateDate = new Date().toISOString();
		const params = [lastUpdateDate];
		await this.transaction(query, params);
	};
	getLastUpdate = async () => {
		const query = 'SELECT * FROM lastUpdate';
		const lastUpdate = (await this.transaction(query))[0] as lastUpdateRow;
		if (!lastUpdate) return '2000-00-00T00:00:00.000';
		return lastUpdate.date;
	};
	protected databaseInitialize = async (query: string) => {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				function (tx) {
					tx.executeSql(query);
				},
				function (error) {
					reject(false);
					throw new Error(
						'Database creation error: ' + error.message
					);
				},
				function () {
					resolve(true);
					//console.log('Created database OK');
				}
			);
		});
	};
	protected isEmpty = async (dbName: string) => {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				function (tx) {
					tx.executeSql(
						'SELECT * FROM ?;',
						[dbName],
						function (tx, resultSet) {
							resultSet.rows.length == 0
								? resolve(true)
								: resolve(false);
						},
						function (tx, error) {
							reject(undefined);
							throw new Error('INSERT error: ' + error.message);
						}
					);
				},
				function (error) {
					reject(undefined);
					throw new Error('transaction error: ' + error.message);
				}
			);
		});
	};

	protected transaction = async (
		query: string,
		params?: queryParams
	): Promise<unknown[]> => {
		return new Promise((resolve, reject) => {
			this.db.transaction(
				function (tx) {
					tx.executeSql(
						query,
						params,
						function (tx, resultSet) {
							let data = [];
							for (
								let i = 0, c = resultSet.rows.length;
								i < c;
								i++
							) {
								data.push(resultSet.rows.item(i));
							}
							resolve(data);
						},
						function (tx, error) {
							reject(undefined);
							throw new Error('INSERT error: ' + error.message);
						}
					);
				},
				function (error) {
					reject(undefined);
					throw new Error('transaction error: ' + error.message);
				},
				function () {
					//console.log('transaction ok');
				}
			);
		});
	};
}

export default DatabaseManager;
