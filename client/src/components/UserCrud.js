import React, { useState, useEffect } from 'react'

import "../App.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

import { v4 as uuidv4 } from 'uuid';

export default function UserCrud({ createUser }) {

  const [selectOptions, setSelectOptions] = useState([]);
  const [accountType, setAccountType] = useState("");
  const [devices, setDevices] = useState(1);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [variant, setVariant] = useState("success");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fillSelectOptions(5);
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    let myuuid = uuidv4();
    if (!myuuid || !accountType || !devices) {
      setAlertMessage("Don't leave empty fields");
      setVariant("danger");
    } else {
      let user = {
        uuid: myuuid.substring(0, 7),
        accountType: accountType,
        devices: devices
      }
      let result = await createUser(user);
      if (result === 'true') {
        setVariant("success");
        setAlertMessage("User saved into the smart contract!");
      } else {
        setAlertMessage(result);
        setVariant("danger");
      }

    }
    setLoading(false);
    setShowAlert(true);
  }

  const fillSelectOptions = (options) => {
    let optionsList = [];
    for (let i = 0; i < options; i++) {
      optionsList.push(i + 1);
    }
    setSelectOptions(optionsList);
  }




  return (
    <Container fluid>
      <h1>Create User</h1>
      {showAlert && (<Row>
        <Col>
          <Alert variant={variant} onClose={() => setShowAlert(false)} dismissible>
            {alertMessage}
          </Alert>
        </Col>
      </Row>)}
      <Row>
        <Col>
          <Form onSubmit={(e) => onSubmit(e)}>
            <Form.Group className="mb-3">
              <Form.Label>Account Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter account type"
                onChange={(e) => setAccountType(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Devices</Form.Label>
              <Form.Select className="select" style={{
                backgroundColor: '#282828',
                color: 'white',
                borderColor: '#57d855'
              }}
                onChange={(e) => {
                  setDevices(e.target.value);
                }
                }>
                {selectOptions.map(item => {
                  return (<option key={item - 1} value={item}>{item}</option>)
                })}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit" >
              Submit
            </Button>
          </Form></Col>
      </Row>
      {loading && <Row>
        <Col></Col>
        <Col>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Col>
        <Col></Col>
      </Row>}
    </Container >
  )
}
