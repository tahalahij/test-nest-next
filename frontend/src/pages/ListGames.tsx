import React from "react"
import { ListGroup, Table } from "react-bootstrap"

const ListGame = ({ items }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Created at</th>
          <th>Game Id</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={item._id}>
            <td>{i+1}</td>
            <td>{item.name}</td>
            <td>{item.createdAt}</td>
            <td>{item._id}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default ListGame
