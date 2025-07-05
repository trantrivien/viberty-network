export function setAccessToken(token: string) {
    document.cookie = `access_token=${token}; path=/; max-age=86400`
    localStorage.setItem('access_token', token)
  }
  
  export function clearAccessToken() {
    document.cookie = 'access_token=; Max-Age=0; path=/'
    localStorage.removeItem('access_token')
  }


  export const getImageUrl = (imagePath?:string) =>{
    return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${imagePath}`
  }