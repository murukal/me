export interface Article {
  id: number
  title: string
  content: string
  createdAt: string
  createdBy: {
    username: string
    avatar: string
  }
}
