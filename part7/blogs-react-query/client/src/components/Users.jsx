import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

const Users = ({ users }) => {
  console.log('users', users)
  return (
    <>
      <h2>Users</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, i) => {
              return <tr key={i}>
                <td><Link to={`/users/${user.id}`} >{user.name}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            })
          }
        </tbody>
      </Table>
    </>
  )
}

export default Users