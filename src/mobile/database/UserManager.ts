import DatabaseManager from './DatabaseManager';
interface user {
	id: number;
	token: string;
}
class UserManager extends DatabaseManager {
	constructor() {
		super();
		this.initialize();
	}
	initialize = async () => {
		const query = 'CREATE TABLE IF NOT EXISTS user (id, token)';
		return this.databaseInitialize(query);
	};
	add = async (user: user) => {
		await this.delete();
		const query = 'INSERT INTO user (id, token) VALUES (?,?)';
		const params = [user.id, user.token];
		return this.transaction(query, params);
	};
	get = async (): Promise<user[]> => {
		const query = 'SELECT * FROM user';
		return this.transaction(query) as Promise<user[]>;
	};
	delete = async () => {
		const query = 'DELETE FROM user';
		return this.transaction(query);
	};
}

export default UserManager;
