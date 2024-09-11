export interface Article {
  id: number
  title: string
  content: string
  createdAt: number
  createdBy: {
    username: string
    avatar: string
  }
}
