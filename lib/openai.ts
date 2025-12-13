import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Please add your OpenAI API key to .env.local')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Generate creative portfolio blog post content
export async function generateBlogPost(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a creative director and design writer. Generate artistic,
          thoughtful blog posts about design, art, and creative processes.
          Write in a sophisticated, inspiring tone that resonates with creative professionals.
          Include visual descriptions, design insights, and artistic perspectives.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating blog post:', error)
    throw error
  }
}

// Generate project case study
export async function generateCaseStudy(projectDetails: {
  title: string
  category: string
  objective: string
  approach?: string
}) {
  const prompt = `Create a detailed case study for a creative project:

  Title: ${projectDetails.title}
  Category: ${projectDetails.category}
  Objective: ${projectDetails.objective}
  ${projectDetails.approach ? `Approach: ${projectDetails.approach}` : ''}

  Include sections for:
  1. Project Overview
  2. Challenge
  3. Creative Process
  4. Solution
  5. Results/Impact

  Write in an artistic, professional tone suitable for a portfolio.`

  return generateBlogPost(prompt)
}

// Generate artistic image descriptions
export async function generateImageDescription(context: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an art critic and curator. Generate poetic, insightful
          descriptions of visual work that capture mood, composition, and artistic intent.`,
        },
        {
          role: 'user',
          content: `Write a short, evocative description for: ${context}`,
        },
      ],
      temperature: 0.9,
      max_tokens: 200,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating image description:', error)
    throw error
  }
}

// Generate creative project ideas
export async function generateProjectIdea(category: string, style?: string) {
  const prompt = `Generate a unique, inspiring creative project idea for:

  Category: ${category}
  ${style ? `Style: ${style}` : ''}

  Include:
  - Project title
  - Concept overview
  - Key visual elements
  - Potential challenges
  - Expected outcomes

  Make it innovative and portfolio-worthy.`

  return generateBlogPost(prompt)
}

// Generate artist statement
export async function generateArtistStatement(background: string, focus: string) {
  const prompt = `Create a compelling artist statement based on:

  Background: ${background}
  Creative Focus: ${focus}

  Write in first person, capturing artistic philosophy, inspirations,
  and approach to creative work. Keep it authentic and thought-provoking.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are helping artists articulate their creative vision.
          Write authentic, thoughtful artist statements that reflect deep
          engagement with creative practice.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error generating artist statement:', error)
    throw error
  }
}

// Generate SEO-optimized content
export async function generateSEOContent(topic: string, keywords: string[]) {
  const prompt = `Create SEO-optimized blog content about: ${topic}

  Target keywords: ${keywords.join(', ')}

  Generate:
  1. Engaging title (60 characters max)
  2. Meta description (155 characters max)
  3. Opening paragraph that hooks readers

  Maintain an artistic, creative tone while incorporating keywords naturally.`

  return generateBlogPost(prompt)
}

// Improve existing content
export async function improveContent(originalContent: string, instructions: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are a skilled editor and creative writer. Improve content
          while maintaining the author's voice and artistic intent.`,
        },
        {
          role: 'user',
          content: `Original content:\n${originalContent}\n\nInstructions: ${instructions}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    return completion.choices[0].message.content
  } catch (error) {
    console.error('Error improving content:', error)
    throw error
  }
}

// Generate image using DALL-E
export async function generateImage(prompt: string) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `Artistic, high-quality image: ${prompt}. Style: modern, minimalist,
      professional portfolio quality.`,
      n: 1,
      size: '1792x1024',
      quality: 'hd',
    })

    return response.data?.[0]?.url ?? ''
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}
