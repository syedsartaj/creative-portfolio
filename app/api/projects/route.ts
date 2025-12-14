import { NextRequest, NextResponse } from 'next/server'
import { getAllProjects, createProject } from '@/lib/db'

// GET /api/projects - Get all projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const featured = searchParams.get('featured')
    const published = searchParams.get('published')

    let filter: any = {}

    if (category) {
      filter.category = category
    }

    if (featured === 'true') {
      filter.featured = true
    }

    if (published === 'true') {
      filter.published = true
    }

    const projects = await getAllProjects()

    // Apply filters
    let filteredProjects = projects

    if (Object.keys(filter).length > 0) {
      filteredProjects = projects.filter(project => {
        if (filter.category && project.category !== filter.category) return false
        if (filter.featured !== undefined && project.featured !== filter.featured) return false
        if (filter.published !== undefined && project.published !== filter.published) return false
        return true
      })
    }

    return NextResponse.json({
      success: true,
      data: filteredProjects,
      count: filteredProjects.length
    })
  } catch (error: any) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch projects',
        message: error.message
      },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create a new project
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ['slug', 'title', 'description', 'content', 'category', 'year']
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          missingFields
        },
        { status: 400 }
      )
    }

    // Prepare project data
    const projectData = {
      slug: body.slug,
      title: body.title,
      description: body.description,
      content: body.content,
      category: body.category,
      images: body.images || [],
      client: body.client || '',
      year: parseInt(body.year),
      tags: body.tags || [],
      featured: body.featured || false,
      published: body.published || false,
    }

    const result = await createProject(projectData)

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        ...projectData
      },
      message: 'Project created successfully'
    }, { status: 201 })

  } catch (error: any) {
    console.error('Error creating project:', error)

    // Handle duplicate slug error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          error: 'A project with this slug already exists',
          message: error.message
        },
        { status: 409 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to create project',
        message: error.message
      },
      { status: 500 }
    )
  }
}
