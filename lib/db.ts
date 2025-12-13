import { MongoClient, MongoClientOptions } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options: MongoClientOptions = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, create a new client
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

export default clientPromise

// Database helper functions for portfolio blog

export async function getDatabase() {
  const client = await clientPromise
  return client.db('creative-portfolio')
}

export async function getAllPosts() {
  const db = await getDatabase()
  const posts = await db
    .collection('posts')
    .find({})
    .sort({ date: -1 })
    .toArray()

  return posts
}

export async function getPostById(id: string) {
  const db = await getDatabase()
  const post = await db.collection('posts').findOne({ id })

  return post
}

export async function getPostsByCategory(category: string) {
  const db = await getDatabase()
  const posts = await db
    .collection('posts')
    .find({ category })
    .sort({ date: -1 })
    .toArray()

  return posts
}

export async function getFeaturedPosts(limit: number = 6) {
  const db = await getDatabase()
  const posts = await db
    .collection('posts')
    .find({ featured: true })
    .sort({ date: -1 })
    .limit(limit)
    .toArray()

  return posts
}

export async function createPost(post: any) {
  const db = await getDatabase()
  const result = await db.collection('posts').insertOne({
    ...post,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  return result
}

export async function updatePost(id: string, updates: any) {
  const db = await getDatabase()
  const result = await db.collection('posts').updateOne(
    { id },
    {
      $set: {
        ...updates,
        updatedAt: new Date()
      }
    }
  )

  return result
}

export async function deletePost(id: string) {
  const db = await getDatabase()
  const result = await db.collection('posts').deleteOne({ id })

  return result
}

// Gallery functions
export async function getAllGalleryImages() {
  const db = await getDatabase()
  const images = await db
    .collection('gallery')
    .find({})
    .sort({ uploadDate: -1 })
    .toArray()

  return images
}

export async function addGalleryImage(image: any) {
  const db = await getDatabase()
  const result = await db.collection('gallery').insertOne({
    ...image,
    uploadDate: new Date(),
  })

  return result
}

// Analytics functions
export async function trackPageView(page: string) {
  const db = await getDatabase()
  await db.collection('analytics').insertOne({
    page,
    timestamp: new Date(),
  })
}

export async function getPageViews(page: string, days: number = 30) {
  const db = await getDatabase()
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  const views = await db
    .collection('analytics')
    .countDocuments({
      page,
      timestamp: { $gte: startDate },
    })

  return views
}
