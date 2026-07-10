import { Request, Response, NextFunction } from 'express';
import { Database } from './database.js';

export class DatabaseService extends Database {
  private collectionMap?: Record<string, string>;

  constructor(uri: string, db_name?: string, collection?: Record<string, string>) {
    super(uri, db_name);
    this.collectionMap = collection;
  }

  /**
   * CENTRALIZED CONNECTION HANDLER
   * This reduces the repeated boilerplate in every method.
   */
  private async getConnectDatabase(next: NextFunction) {
    try {
      const { mongoclient, mongoclientDbPing } = await this.connectToDatabase();

      if (!(await this.isDatabaseExists(mongoclient, this.db_name))) {
        throw new Error(`Missing database: ${this.db_name}`);
      }

      return { 
        db: mongoclient.db(this.db_name || 'mynodejsapp'), 
        mongoclient, 
        mongoclientDbPing 
      };
    } catch (error) {
      console.error(`An error occurred:getConnectDatabase: ${error}`);
      next(new Error(`Internal server error: Database connectivity issue.`));
      return null;
    }
  }

  async isDatabaseExists(mongoclient: any, dbName?: string): Promise<boolean> {
    const arrayOfDatabases = await this.listOfDatabases(mongoclient);
    return dbName ? arrayOfDatabases.includes(dbName) : false;
  }

  async readFromDatabase(req: Request, res: Response, next: NextFunction) {
    const connectDB = await this.getConnectDatabase(next);
    if (!connectDB) return; // Error handled by getConnectDatabase

    try {
      const collection = connectDB.db.collection("people");
      const data = await collection.find({}).toArray();
      return data;
    } catch (error) {
      console.error(`An error occurred:readFromDatabase: ${error}`);
      return next(error);
    }
  }

  async databasePing(req: Request, res: Response, next: NextFunction) {
    const connectDB = await this.getConnectDatabase(next);
    if (!connectDB) return;

    return connectDB.mongoclientDbPing;
  }

  async createDatabaseCollectionInsertValue(next: NextFunction, collectionName: string) {
    const connectDB = await this.getConnectDatabase(next);
    if (!connectDB) return;

    try {
      const collection = connectDB.db.collection(collectionName);
      // db.people.insert({"firstName":"Dave","lastName":"Gebler","email":"me@davegebler.com","website":"https://davegebler.com"});
      const result = await collection.insertOne({
        name: "Example Item",
        type: "Database Entry",
        timestamp: new Date()
      });
      
      return result.insertedId;
    } catch (error) {
      console.error(`An error occurred:createDatabaseCollectionInsertValue: ${error}`);
      return next(error);
    } finally {
      // Note: Only close if you aren't using a connection pool
      await connectDB.mongoclient.close();
    }
  }
}