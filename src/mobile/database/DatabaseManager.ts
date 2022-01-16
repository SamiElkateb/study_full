import * as SQLite from 'expo-sqlite';
import { Course } from '../DataStructures/LearnModule';

type queryParams = (string | number)[];

class DatabaseManager {
	protected db: SQLite.WebSQLDatabase;
	constructor() {
		this.db = SQLite.openDatabase('data.db');
	}

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
					console.log('Created database OK');
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
					console.log('transaction ok');
				}
			);
		});
	};
}

export default DatabaseManager;
