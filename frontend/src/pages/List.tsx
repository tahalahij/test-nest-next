import React from "react"
import { ListGroup, Table } from "react-bootstrap"

const List = ({ items }) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Type</th>
          <th>Amount</th>
          <th>Time</th>
          <th>Transaction Id</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, i) => (
          <tr key={item._id}>
            <td>{i+1}</td>
            <td>{item.type}</td>
            <td>{item.amount}</td>
            <td>{item.createdAt}</td>
            <td>{item._id}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default List
