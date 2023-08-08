import exp from 'constants'
import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb'
import dotenvn from 'dotenv'
import User from '~/models/schemas/user.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema'
dotenvn.config()
console.log(process.env.DB_USERNAME)

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.7wraadj.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri)

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = client.db(process.env.DB_NAME)
  }

  async connect() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch (error) {
      console.log('error', error)
      throw error
    }
  }

  //insert into the database collection(table) users
  get users(): Collection<User> {
    return this.db.collection(process.env.DB_USERS_COLLECTION as string)
  }
  //insert into the database collection(table) refresh_tokens
  get refreshTokens(): Collection<RefreshToken> {
    console.log('asdasd')

    return this.db.collection(process.env.DB_REFRESH_TOKENS_COLLECTION as string)
  }
}
const databaseService = new DatabaseService()
export default databaseService