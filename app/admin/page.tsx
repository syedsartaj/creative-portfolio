'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, Search, Palette, Layers, Eye, X, Save, Image as ImageIcon, ExternalLink } from 'lucide-react'

interface Project {
  _id?: string
  title: string
  slug: string
  description: string
  content: string
  category: 'web-design' | 'branding' | 'illustration' | 'photography' | 'ui-ux' | 'motion'
  client?: string
  year: number
  featuredImage: string
  images: string[]
  tools: string[]
  liveUrl?: string
  githubUrl?: string
  isFeatured: boolean
  published: boolean
  tags: string[]
  createdAt?: string
  updatedAt?: string
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

const CATEGORIES = [
  { value: 'web-design', label: 'Web Design' },
  { value: 'branding', label: 'Branding' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'photography', label: 'Photography' },
  { value: 'ui-ux', label: 'UI/UX' },
  { value: 'motion', label: 'Motion' },
]

const initialFormState: Project = {
  title: '',
  slug: '',
  description: '',
  content: '',
  category: 'web-design',
  client: '',
  year: new Date().getFullYear(),
  featuredImage: '',
  images: [],
  tools: [],
  liveUrl: '',
  githubUrl: '',
  isFeatured: false,
  published: false,
  tags: [],
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create')
  const [formData, setFormData] = useState<Project>(initialFormState)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [imageInput, setImageInput] = useState('')
  const [toolInput, setToolInput] = useState('')
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  useEffect(() => {
    filterProjects()
  }, [projects, searchQuery, selectedCategory])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch projects')
      }

      setProjects(data.data)
    } catch (err: any) {
      showToast(err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  const filterProjects = () => {
    let filtered = projects

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    setFilteredProjects(filtered)
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const handleCreateClick = () => {
    setFormMode('create')
    setFormData(initialFormState)
    setEditingId(null)
    setShowForm(true)
  }

  const handleEditClick = (project: Project) => {
    setFormMode('edit')
    setFormData(project)
    setEditingId(project._id || null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setFormData(initialFormState)
    setEditingId(null)
    setImageInput('')
    setToolInput('')
    setTagInput('')
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    if (name === 'title') {
      setFormData({
        ...formData,
        title: value,
        slug: generateSlug(value),
      })
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
    } else if (type === 'number') {
      setFormData({ ...formData, [name]: parseInt(value) || 0 })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setFormData({ ...formData, images: [...formData.images, imageInput.trim()] })
      setImageInput('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })
  }

  const handleAddTool = () => {
    if (toolInput.trim() && !formData.tools.includes(toolInput.trim())) {
      setFormData({ ...formData, tools: [...formData.tools, toolInput.trim()] })
      setToolInput('')
    }
  }

  const handleRemoveTool = (tool: string) => {
    setFormData({ ...formData, tools: formData.tools.filter((t) => t !== tool) })
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] })
      setTagInput('')
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter((t) => t !== tag) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = formMode === 'create' ? '/api/projects' : `/api/projects/${editingId}`
      const method = formMode === 'create' ? 'POST' : 'PUT'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${formMode} project`)
      }

      showToast(
        `Project ${formMode === 'create' ? 'created' : 'updated'} successfully!`,
        'success'
      )
      await fetchProjects()
      handleCancelForm()
    } catch (err: any) {
      showToast(err.message, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete project')
      }

      showToast('Project deleted successfully!', 'success')
      await fetchProjects()
    } catch (err: any) {
      showToast(err.message, 'error')
    }
  }

  const getCategoryStats = () => {
    return CATEGORIES.map((cat) => ({
      category: cat.label,
      value: cat.value,
      total: projects.filter((p) => p.category === cat.value).length,
      published: projects.filter((p) => p.category === cat.value && p.published).length,
      drafts: projects.filter((p) => p.category === cat.value && !p.published).length,
    }))
  }

  const stats = {
    total: projects.length,
    published: projects.filter((p) => p.published).length,
    drafts: projects.filter((p) => !p.published).length,
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
              toast.type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="hover:opacity-75 transition-opacity"
            >
              <X size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                Creative Portfolio Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Manage all your projects from one place</p>
            </div>
            <Palette className="text-purple-600" size={32} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Layers size={20} className="text-purple-600" />
            Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleCreateClick}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
            >
              <Plus size={20} />
              Create Project
            </button>
            {showForm && formMode === 'edit' && (
              <button
                onClick={handleCreateClick}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                <Plus size={20} />
                New Project Instead
              </button>
            )}
            {showForm && (
              <button
                onClick={handleCancelForm}
                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                <X size={20} />
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Projects</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-violet-100 rounded-lg flex items-center justify-center">
                <Layers className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-green-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Published</p>
                <p className="text-3xl font-bold text-green-600 mt-1">{stats.published}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center">
                <Eye className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Drafts</p>
                <p className="text-3xl font-bold text-gray-600 mt-1">{stats.drafts}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-slate-100 rounded-lg flex items-center justify-center">
                <Edit className="text-gray-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Category Stats */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Projects by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {getCategoryStats().map((stat) => (
              <div
                key={stat.value}
                className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg p-4 border border-purple-100"
              >
                <p className="text-xs font-medium text-gray-600 mb-1">{stat.category}</p>
                <p className="text-2xl font-bold text-purple-600">{stat.total}</p>
                <div className="flex gap-2 mt-2 text-xs">
                  <span className="text-green-600">Pub: {stat.published}</span>
                  <span className="text-gray-500">Draft: {stat.drafts}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inline Create/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-purple-200 mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              {formMode === 'create' ? <Plus size={24} /> : <Edit size={24} />}
              {formMode === 'create' ? 'Create New Project' : 'Edit Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Project title"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="project-slug"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="2000"
                    max="2100"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                {/* Client */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Client
                  </label>
                  <input
                    type="text"
                    name="client"
                    value={formData.client}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Client name"
                  />
                </div>

                {/* Featured Image */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL *
                  </label>
                  <input
                    type="url"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Brief project description"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Full project content (supports markdown)"
                />
              </div>

              {/* Images Array */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <ImageIcon size={16} />
                  Project Images
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Image URL (press Enter to add)"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-purple-50 px-3 py-1 rounded-full text-sm"
                    >
                      <span className="truncate max-w-[200px]">{img}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Array */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tools Used
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={toolInput}
                    onChange={(e) => setToolInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTool())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tool name (press Enter to add)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTool}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tools.map((tool) => (
                    <div
                      key={tool}
                      className="flex items-center gap-2 bg-violet-50 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{tool}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTool(tool)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Array */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Tag name (press Enter to add)"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <div
                      key={tag}
                      className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <ExternalLink size={16} />
                    Live URL
                  </label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub URL
                  </label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured Project</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="published"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Published</span>
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:shadow-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save size={20} />
                  {submitting
                    ? formMode === 'create'
                      ? 'Creating...'
                      : 'Updating...'
                    : formMode === 'create'
                    ? 'Create Project'
                    : 'Update Project'}
                </button>
                <button
                  type="button"
                  onClick={handleCancelForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-purple-100 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by title, description, or tags..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        </div>

        {/* Projects List */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-purple-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="text-purple-600" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {projects.length === 0 ? 'No projects yet' : 'No matching projects'}
            </h3>
            <p className="text-gray-600 mb-6">
              {projects.length === 0
                ? 'Get started by creating your first project'
                : 'Try adjusting your search or filters'}
            </p>
            {projects.length === 0 && (
              <button
                onClick={handleCreateClick}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-medium"
              >
                <Plus size={20} />
                Create First Project
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-purple-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Project
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProjects.map((project) => (
                    <tr key={project._id} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-violet-100 flex-shrink-0">
                            {project.featuredImage ? (
                              <img
                                src={project.featuredImage}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <ImageIcon className="text-purple-400" size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">{project.title}</p>
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {CATEGORIES.find((c) => c.value === project.category)?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {project.client || '-'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{project.year}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {project.published ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                              Draft
                            </span>
                          )}
                          {project.isFeatured && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(project)}
                            className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(project._id!, project.title)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
