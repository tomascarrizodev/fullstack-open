import { useState } from "react"

const NewBlog = (props) => {

  const {
    toggleNewBlog,
    setToggleNewBlog,
    handleCreate,
    children
  } = props

  const onToggle = (e) => {
    e.preventDefault()
    setToggleNewBlog(!toggleNewBlog)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => handleCreate(e)}>
        {children}
        <button onClick={(e) => onToggle(e)}>cancel</button>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default NewBlog