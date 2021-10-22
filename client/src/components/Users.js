import React, { useState, useEffect } from 'react'

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

export default function Users({ users, updateAccountType, deleteUser }) {

  const [getUsers, setGetUsers] = useState([]);
  const [show, setShow] = useState(false);
  const [modalUser, setModalUser] = useState(undefined);
  const [accountType, setAccountType] = useState(undefined);
  const [showAlert, setShowAlert] = useState(false);
  const [variant, setVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setGetUsers(users);
  }, [users])

  const tableClicked = (user) => {
    setShow(true);
    setModalUser(user);
    setAccountType(user.accountType);

  }

  const handleClose = async (event) => {
    setLoading(true);
    if (event === 'update') {
      let result = await updateAccountType(modalUser.uuid, accountType);
      if (result === 'true') {
        setVariant("success");
        setAlertMessage("User updated in the smart contract!");
      } else {
        setAlertMessage(result);
        setVariant("danger");
      }
      setShowAlert(true);
    } else if (event === 'delete') {
      let result = await deleteUser(modalUser.uuid);
      if (result === 'true') {
        setVariant("success");
        setAlertMessage("User deleted from the smart contract!");
      } else {
        setAlertMessage(result);
        setVariant("danger");
      }
      setShowAlert(true);
    }
    setShowAlert(true);
    setShow(false)
    setAccountType(undefined);
    setLoading(false);
  };

  return (
    <Container fluid>
      <h1>Users</h1>
      {showAlert && (<Row>
        <Col>
          <Alert variant={variant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        </Col>
      </Row>)}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>UUID</th>
            <th>Account Type</th>
            <th>Devices</th>
          </tr>
        </thead>
        <tbody>
          {getUsers.map(user => {
            return (<tr key={user.uuid} onClick={_ => tableClicked(user)}>
              <td>{user.uuid}</td>
              <td>{user.accountType}</td>
              <td>{user.devices}</td>
            </tr>)
          })}
        </tbody>
      </Table>

      {show && <Modal show={show} animation={true} onHide={() => handleClose('close')}>
        <Modal.Header style={{
          backgroundColor: '#212529'
        }} closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{
          backgroundColor: '#212529'
        }}>
          <h4>uuid: {modalUser.uuid}</h4>
          <Form.Label>Account Type</Form.Label>
          <Form.Control onChange={(e) => setAccountType(e.target.value)} type="text" value={accountType} placeholder="Account Type" />
          <Form.Label>Devices: {modalUser.devices}</Form.Label>
          {loading && <Row>
            <Col></Col>
            <Col>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </Col>
            <Col></Col>
          </Row>}
        </Modal.Body>
        <Modal.Footer style={{
          backgroundColor: '#212529'
        }}>
          <Button variant="secondary" onClick={() => handleClose('delete')}>
            Delete
          </Button>
          <Button variant="primary" onClick={() => handleClose('update')}>
            Save Changes
          </Button>
        </Modal.Footer>

      </Modal>}


    </Container >
  )
}
