import { useState } from 'react'

const FormBlog = ({ handleCreate }) => {
  const [formData, setFormData] = useState({ title: '', author: '', url: '' })

  const handleChange = (event) => {
    const { value, name } = event.target
    setFormData({ ...formData, [name]: value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    handleCreate(formData)
    setFormData({ title: '', author: '', url: '' })
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor='input-title'>title:</label>
      <input onChange={handleChange} name='title' value={formData.title} id='input-title' type='text' />
      <br />
      <label htmlFor='input-author'>author:</label>
      <input onChange={handleChange} name='author' value={formData.author} id='input-author' type='text' />
      <br />
      <label htmlFor='input-url'>url:</label>
      <input onChange={handleChange} name='url' value={formData.url} id='input-url' type='text' />
      <br />
      <button type='submit'>create</button>
    </form>
  )
}
export default FormBlog
