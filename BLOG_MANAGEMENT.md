# Blog Management System Documentation

## Overview

This creative portfolio template includes a complete blog/project management system built with Next.js, MongoDB, and TypeScript. The system allows you to create, edit, and manage creative portfolio projects with a beautiful, modern admin dashboard.

## Features

- **Full CRUD Operations**: Create, Read, Update, and Delete projects
- **Rich Project Data**: Support for multiple images, tags, categories, and detailed content
- **Creative Categories**: Web Design, Branding, Illustration, Photography, UI/UX, Motion Graphics, Print, 3D
- **Featured Projects**: Mark projects as featured for homepage display
- **Draft System**: Save projects as drafts before publishing
- **Beautiful Admin Dashboard**: Modern UI with purple/violet gradient theme
- **Grid View**: Visual project cards with thumbnails
- **Statistics**: Real-time stats for total, published, featured, and draft projects
- **Responsive Design**: Works perfectly on all devices

## Architecture

### Database Layer (`lib/db.ts`)

The database layer provides a MongoDB connection and CRUD operations for projects.

#### Project Interface

```typescript
interface Project {
  _id?: ObjectId
  slug: string              // URL-friendly identifier
  title: string            // Project title
  description: string      // Short description
  content: string          // Full content (supports Markdown)
  category: string         // Project category
  images: string[]         // Array of image URLs
  client?: string          // Optional client name
  year: number            // Project year
  tags: string[]          // Project tags
  featured: boolean       // Featured status
  published: boolean      // Published status
  createdAt: Date         // Creation timestamp
  updatedAt: Date         // Last update timestamp
}
```

#### Available Functions

- `getProjects(filter)` - Get projects with optional filtering
- `getAllProjects()` - Get all projects
- `getProjectById(id)` - Get a single project by ID
- `getProjectBySlug(slug)` - Get a project by slug
- `createProject(project)` - Create a new project
- `updateProject(id, updates)` - Update an existing project
- `deleteProject(id)` - Delete a project
- `getFeaturedProjects(limit)` - Get featured projects
- `getProjectsByCategory(category)` - Get projects by category

### API Routes

#### GET `/api/projects`
Get all projects with optional filtering.

**Query Parameters:**
- `category` - Filter by category
- `featured` - Filter featured projects (true/false)
- `published` - Filter published projects (true/false)

**Response:**
```json
{
  "success": true,
  "data": [...projects],
  "count": 10
}
```

#### POST `/api/projects`
Create a new project.

**Required Fields:**
- slug, title, description, content, category, year

**Request Body:**
```json
{
  "slug": "my-project",
  "title": "My Amazing Project",
  "description": "A short description",
  "content": "Full project details...",
  "category": "Web Design",
  "images": ["https://example.com/image.jpg"],
  "client": "Client Name",
  "year": 2024,
  "tags": ["react", "nextjs"],
  "featured": false,
  "published": true
}
```

#### GET `/api/projects/[id]`
Get a single project by ID.

**Response:**
```json
{
  "success": true,
  "data": {...project}
}
```

#### PUT `/api/projects/[id]`
Update an existing project.

**Request Body:** Same as POST, all fields optional

#### DELETE `/api/projects/[id]`
Delete a project.

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### Components

#### ProjectForm (`components/ProjectForm.tsx`)

A comprehensive form component for creating and editing projects.

**Props:**
- `project` - Optional existing project data for editing
- `mode` - 'create' or 'edit'

**Features:**
- Form validation
- Multiple image upload
- Tag management
- Category selection
- Featured/Published toggles
- Auto-save functionality
- Error handling

### Admin Pages

#### Dashboard (`app/admin/page.tsx`)

Main admin dashboard showing:
- Statistics cards (Total, Published, Featured, Drafts)
- Grid view of all projects with thumbnails
- Edit and Delete buttons for each project
- Create new project button
- Visual status badges (Featured, Draft)

**Access:** `/admin`

#### New Project (`app/admin/projects/new/page.tsx`)

Page for creating new projects.

**Access:** `/admin/projects/new`

#### Edit Project (`app/admin/projects/[id]/page.tsx`)

Page for editing existing projects.

**Access:** `/admin/projects/[id]`

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory:

```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creative-portfolio?retryWrites=true&w=majority
```

### 2. MongoDB Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Create a database named `creative-portfolio`
4. Create a collection named `projects`
5. (Optional) Create a unique index on the `slug` field:

```javascript
db.projects.createIndex({ "slug": 1 }, { unique: true })
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Development Server

```bash
npm run dev
```

### 5. Access Admin Dashboard

Navigate to `http://localhost:3000/admin`

## Usage Guide

### Creating a Project

1. Go to `/admin`
2. Click "New Project" button
3. Fill in all required fields:
   - Title
   - Slug (URL-friendly, e.g., "my-amazing-project")
   - Category
   - Year
   - Description
   - Content
4. Add images by entering URLs and clicking "Add Image"
5. Add tags by entering text and clicking "Add Tag"
6. Optional: Enter client name
7. Toggle "Featured" to show on homepage
8. Toggle "Published" to make visible
9. Click "Create Project"

### Editing a Project

1. Go to `/admin`
2. Find the project you want to edit
3. Click "Edit" button
4. Make your changes
5. Click "Update Project"

### Deleting a Project

1. Go to `/admin`
2. Find the project you want to delete
3. Click "Delete" button
4. Confirm deletion

### Image Management

The system currently supports image URLs. To use images:

1. Upload images to a hosting service (Cloudinary, AWS S3, etc.)
2. Copy the public URL
3. Paste the URL in the image input field
4. Click "Add Image"

**Recommended Image Sizes:**
- Thumbnail: 800x600px
- Full size: 1920x1080px or higher

### Categories

Available categories:
- Web Design
- Branding
- Illustration
- Photography
- UI/UX
- Motion Graphics
- Print
- 3D

## Best Practices

### Slugs
- Use lowercase letters
- Use hyphens instead of spaces
- Keep it short and descriptive
- Example: `branding-acme-corp`

### Images
- Use high-quality images
- Optimize images before uploading
- Use consistent aspect ratios
- Recommended: WebP format for better performance

### Content
- Use Markdown for formatting
- Keep descriptions concise (1-2 sentences)
- Use detailed content for full project stories
- Include process, challenges, and solutions

### Tags
- Use relevant, searchable keywords
- Keep tags consistent across projects
- Use 3-8 tags per project
- Examples: react, nextjs, typescript, figma

## Displaying Projects on Frontend

### Get All Published Projects

```typescript
import { getProjects } from '@/lib/db'

export default async function ProjectsPage() {
  const projects = await getProjects({ published: true })

  return (
    <div>
      {projects.map(project => (
        <div key={project._id.toString()}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  )
}
```

### Get Featured Projects

```typescript
import { getFeaturedProjects } from '@/lib/db'

export default async function HomePage() {
  const featured = await getFeaturedProjects(6)

  return (
    <section>
      <h2>Featured Work</h2>
      {/* Display featured projects */}
    </section>
  )
}
```

### Get Projects by Category

```typescript
import { getProjectsByCategory } from '@/lib/db'

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const projects = await getProjectsByCategory(params.category)

  return (
    <div>
      <h1>{params.category} Projects</h1>
      {/* Display category projects */}
    </div>
  )
}
```

### Get Single Project

```typescript
import { getProjectBySlug } from '@/lib/db'

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug)

  if (!project) {
    return <div>Project not found</div>
  }

  return (
    <article>
      <h1>{project.title}</h1>
      <div>{project.content}</div>
    </article>
  )
}
```

## API Integration Examples

### Fetch Projects with JavaScript

```javascript
// Get all published projects
const response = await fetch('/api/projects?published=true')
const data = await response.json()
const projects = data.data

// Get featured projects
const response = await fetch('/api/projects?featured=true&published=true')
const data = await response.json()
const featured = data.data

// Get projects by category
const response = await fetch('/api/projects?category=Web%20Design&published=true')
const data = await response.json()
const webProjects = data.data
```

### Create Project Programmatically

```javascript
const newProject = {
  slug: 'my-new-project',
  title: 'My New Project',
  description: 'A brief description',
  content: 'Full content here...',
  category: 'Web Design',
  images: ['https://example.com/image.jpg'],
  year: 2024,
  tags: ['react', 'nextjs'],
  featured: false,
  published: true
}

const response = await fetch('/api/projects', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newProject)
})

const result = await response.json()
```

## Troubleshooting

### Database Connection Issues

**Error:** "Please add your MongoDB URI to .env.local"

**Solution:**
1. Ensure `.env.local` exists in root directory
2. Add `MONGODB_URI=your-connection-string`
3. Restart the development server

### Duplicate Slug Error

**Error:** "A project with this slug already exists"

**Solution:** Use a unique slug for each project

### Images Not Displaying

**Solution:**
1. Ensure image URLs are publicly accessible
2. Check CORS settings on image host
3. Use HTTPS URLs
4. Verify image URLs are valid

### API Errors

**Error:** 500 Internal Server Error

**Solution:**
1. Check MongoDB connection
2. Verify environment variables
3. Check server logs for detailed errors
4. Ensure MongoDB cluster is running

## Security Considerations

### Production Deployment

1. **Add Authentication**: Protect admin routes with authentication
2. **Input Validation**: Validate all user inputs
3. **Rate Limiting**: Add rate limiting to API routes
4. **CORS**: Configure CORS for API routes
5. **Environment Variables**: Never commit `.env.local` to version control

### Recommended Authentication

```typescript
// Example with NextAuth.js
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Your code here
}
```

## Performance Optimization

### Database Indexes

Create indexes for better query performance:

```javascript
// MongoDB shell
db.projects.createIndex({ "slug": 1 }, { unique: true })
db.projects.createIndex({ "category": 1 })
db.projects.createIndex({ "published": 1 })
db.projects.createIndex({ "featured": 1 })
db.projects.createIndex({ "createdAt": -1 })
```

### Image Optimization

Use Next.js Image component for automatic optimization:

```typescript
import Image from 'next/image'

<Image
  src={project.images[0]}
  alt={project.title}
  width={800}
  height={600}
  quality={80}
/>
```

## Support

For issues or questions:
1. Check this documentation
2. Review API error messages
3. Check MongoDB Atlas dashboard
4. Review server logs

## License

This blog management system is part of the Creative Portfolio template.
