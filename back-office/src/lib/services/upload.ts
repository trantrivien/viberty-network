import api from '@/lib/api/client'

/**
 * Upload an image file to the server
 * @param file - File object (image)
 * @returns { imageUrl: string }
 */
export async function uploadImage(file: File): Promise<{ imageUrl: string }> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const res = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return res.data
  } catch (error) {
    console.error('Upload failed:', error)
    throw error
  }
}
