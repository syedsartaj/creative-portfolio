import { MongoClient, MongoClientOptions, ObjectId } from 'mongodb'

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

// Project Interface
export interface Project {
  _id?: ObjectId
  slug: string
  title: string
  description: string
  content: string
  category: string
  images: string[]
  client?: string
  year: number
  tags: string[]
  featured: boolean
  published: boolean
  createdAt: Date
  updatedAt: Date
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

// Project CRUD Functions

export async function getProjects(filter: Partial<Project> = {}) {
  const db = await getDatabase()
  const projects = await db
    .collection<Project>('projects')
    .find(filter)
    .sort({ createdAt: -1 })
    .toArray()

  return projects
}

export async function getAllProjects() {
  const db = await getDatabase()
  const projects = await db
    .collection<Project>('projects')
    .find({})
    .sort({ createdAt: -1 })
    .toArray()

  return projects
}

export async function getProjectById(id: string) {
  const db = await getDatabase()
  const project = await db
    .collection<Project>('projects')
    .findOne({ _id: new ObjectId(id) })

  return project
}

export async function getProjectBySlug(slug: string) {
  const db = await getDatabase()
  const project = await db
    .collection<Project>('projects')
    .findOne({ slug })

  return project
}

export async function createProject(project: Omit<Project, '_id' | 'createdAt' | 'updatedAt'>) {
  const db = await getDatabase()
  const result = await db.collection<Project>('projects').insertOne({
    ...project,
    createdAt: new Date(),
    updatedAt: new Date(),
  } as Project)

  return result
}

export async function updateProject(id: string, updates: Partial<Project>) {
  const db = await getDatabase()
  const { _id, createdAt, ...updateData } = updates as any

  const result = await db.collection<Project>('projects').updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updateData,
        updatedAt: new Date()
      }
    }
  )

  return result
}

export async function deleteProject(id: string) {
  const db = await getDatabase()
  const result = await db.collection<Project>('projects').deleteOne({
    _id: new ObjectId(id)
  })

  return result
}

export async function getFeaturedProjects(limit: number = 6) {
  const db = await getDatabase()
  const projects = await db
    .collection<Project>('projects')
    .find({ featured: true, published: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()

  return projects
}

export async function getProjectsByCategory(category: string) {
  const db = await getDatabase()
  const projects = await db
    .collection<Project>('projects')
    .find({ category, published: true })
    .sort({ createdAt: -1 })
    .toArray()

  return projects
}
