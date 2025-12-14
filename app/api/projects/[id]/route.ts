import { NextRequest, NextResponse } from 'next/server'
import { getProjectById, updateProject, deleteProject } from '@/lib/db'
import { ObjectId } from 'mongodb'

// GET /api/projects/[id] - Get a single project by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid project ID format'
        },
        { status: 400 }
      )
    }

    const project = await getProjectById(id)

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: project
    })

  } catch (error: any) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch project',
        message: error.message
      },
      { status: 500 }
    )
  }
}

// PUT /api/projects/[id] - Update a project
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid project ID format'
        },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Check if project exists
    const existingProject = await getProjectById(id)
    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found'
        },
        { status: 404 }
      )
    }

    // Prepare update data
    const updateData: any = {}

    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.content !== undefined) updateData.content = body.content
    if (body.category !== undefined) updateData.category = body.category
    if (body.images !== undefined) updateData.images = body.images
    if (body.client !== undefined) updateData.client = body.client
    if (body.year !== undefined) updateData.year = parseInt(body.year)
    if (body.tags !== undefined) updateData.tags = body.tags
    if (body.featured !== undefined) updateData.featured = body.featured
    if (body.published !== undefined) updateData.published = body.published

    const result = await updateProject(id, updateData)

    if (result.matchedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found'
        },
        { status: 404 }
      )
    }

    // Fetch updated project
    const updatedProject = await getProjectById(id)

    return NextResponse.json({
      success: true,
      data: updatedProject,
      message: 'Project updated successfully'
    })

  } catch (error: any) {
    console.error('Error updating project:', error)

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
        error: 'Failed to update project',
        message: error.message
      },
      { status: 500 }
    )
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Validate ObjectId
    if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid project ID format'
        },
        { status: 400 }
      )
    }

    // Check if project exists
    const existingProject = await getProjectById(id)
    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found'
        },
        { status: 404 }
      )
    }

    const result = await deleteProject(id)

    if (result.deletedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'Project not found'
        },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })

  } catch (error: any) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to delete project',
        message: error.message
      },
      { status: 500 }
    )
  }
}
