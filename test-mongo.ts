import { MongoClient } from 'mongodb'
import * as fs from 'fs'
import * as path from 'path'

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local')

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  const envLines = envContent.split('\n')
  
  envLines.forEach(line => {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim()
      process.env[key.trim()] = value
    }
  })
  
  console.log('✅ Loaded .env.local file')
} else {
  console.log('❌ .env.local file not found')
  console.log('📁 Current directory:', process.cwd())
  console.log('📁 Looking for:', envPath)
}

async function testConnection(): Promise<void> {
  console.log('🔍 Checking environment variables...')
  console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI)
  console.log('MONGODB_DB:', process.env.MONGODB_DB)
  
  if (!process.env.MONGODB_URI) {
    console.error('❌ MONGODB_URI not found in environment variables')
    console.log('📝 Please create a .env.local file with:')
    console.log('MONGODB_URI=your_mongodb_connection_string')
    console.log('MONGODB_DB=kazmotors')
    return
  }

  const uri = process.env.MONGODB_URI
  const dbName = process.env.MONGODB_DB || 'kazmotors'
  
  console.log(`🔄 Attempting to connect to MongoDB...`)
  console.log(`🔄 Database name: ${dbName}`)
  
  try {
    const client = new MongoClient(uri)
    await client.connect()
    
    console.log('✅ Successfully connected to MongoDB!')
    
    // Try to access the database
    const db = client.db(dbName)
    const collections = await db.listCollections().toArray()
    
    console.log(`✅ Found ${collections.length} collections in the database:`)
    collections.forEach(collection => {
      console.log(`   - ${collection.name}`)
    })
    
    // Create a test document
    console.log('🔄 Testing write access...')
    const testCollection = db.collection('connection_tests')
    const result = await testCollection.insertOne({
      test: 'Connection test',
      timestamp: new Date()
    })
    
    if (result.acknowledged) {
      console.log('✅ Successfully wrote to the database!')
    }
    
    await client.close()
    console.log('✅ Connection test completed successfully!')
  } catch (error) {
    console.error('❌ MongoDB connection error:', (error as Error).message)
  }
}

testConnection()