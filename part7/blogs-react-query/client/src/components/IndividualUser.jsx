import { useParams } from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'

const IndividualUser = ({ users }) => {
  const { id } = useParams()
  if (!users) return null
  const user = users.find(u => u.id === id)
  return (
    <>
      <h2>{user.name}</h2>
      <h5>added blogs</h5>
      <ListGroup>
        {
          user.blogs.map((blog, i) => {
            return <ListGroup.Item key={i}>{blog.title}</ListGroup.Item>
          })
        }
      </ListGroup>
    </>
  )
}

export default IndividualUser