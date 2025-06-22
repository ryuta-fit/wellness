import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wellness-leaders.vercel.app'
  
  const categories = [
    'anatomy',
    'physiology',
    'nutrition',
    'biomechanics',
    'pathology',
    'rehabilitation'
  ]
  
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/quiz/${category}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/levels`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...categoryUrls,
  ]
}