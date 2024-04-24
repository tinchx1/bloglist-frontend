import { create } from 'zustand'
import blogsService from '../services/blogsService'
export const useBlogsStore = create((set) => ({
  blogs: [],
  setBlogs: (blogs) => set({ blogs }),
  addBlog: (blog) => set(state => ({ blogs: [...state.blogs, blog] })),
  updateBlog: (blog) => set(state => ({ blogs: state.blogs.map(b => b.id !== blog.id ? b : blog) })),
  removeBlog: (id) => set(state => ({ blogs: state.blogs.filter(blog => blog.id !== id) })),
  fetchBlogs: async () => {
    const response = await blogsService.getAll()
    set({ blogs: response })
  }
}))
