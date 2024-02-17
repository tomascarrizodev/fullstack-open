import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'

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
      <Form onSubmit={(e) => handleCreate(e)}>
        {children}
        <ButtonGroup className="mt-4">
          <Button variant="danger" onClick={(e) => onToggle(e)}>cancel</Button>
          <Button variant='primary' type='submit'>create</Button>
        </ButtonGroup>
      </Form>
    </>
  )
}

export default NewBlog