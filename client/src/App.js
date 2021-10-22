import React, { useState, useEffect } from "react";
import './App.css';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { getWeb3, getUserCrud } from "./utils";


import UserCrud from "./components/UserCrud";
import Users from "./components/Users";
function App() {

  const [web3, setWeb3] = useState(undefined);
  const [userCrud, setUserCrud] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined)
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const userCrud = await getUserCrud(web3);
      console.log(userCrud.methods);
      const users = await userCrud.methods.getUsers().call();
      const totalUsers = await userCrud.methods.totalUsers().call();
      setWeb3(web3);
      setUserCrud(userCrud);
      setAccounts(accounts);
      setUsers(users);
      setTotalUsers(totalUsers);
    };
    init();
  }, []);

  const createUser = async user => {
    try {
      await userCrud.methods.insert(user.uuid, user.accountType, user.devices)
        .send({ from: accounts[0] });
      let users = await userCrud.methods.getUsers().call();
      let totalUsers = await userCrud.methods.totalUsers().call();
      setUsers(users);
      setTotalUsers(totalUsers);
      return 'true';
    } catch (ex) {
      return ex.message;
    }
  }

  const updateAccountType = async (uuid, newAccountType) => {
    try {
      await userCrud.methods.updateAccountType(uuid, newAccountType)
        .send({ from: accounts[0] });
      let users = await userCrud.methods.getUsers().call();
      let totalUsers = await userCrud.methods.totalUsers().call();
      setUsers(users);
      setTotalUsers(totalUsers);
      return 'true';
    } catch (ex) {
      return ex.message;
    }
  }

  const deleteUser = async uuid => {
    try {
      await userCrud.methods.deleteUser(uuid)
        .send({ from: accounts[0] });
      let users = await userCrud.methods.getUsers().call();
      let totalUsers = await userCrud.methods.totalUsers().call();
      setUsers(users);
      setTotalUsers(totalUsers);
      return 'true';
    } catch (ex) {
      return ex.message;
    }
  }

  if (typeof web3 === 'undefined'
    || typeof userCrud === 'undefined'
    || typeof accounts === 'undefined') {
    return <div>Loading...</div>
  } else {
    return (
      <Router>
        <div className="app">
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">Dapp</Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/users">Users Details</Nav.Link>
                <Navbar.Text className="justify-content-end">
                  <h4>Total users: {totalUsers}</h4>
                </Navbar.Text>
              </Nav>
            </Container>
          </Navbar>
        </div>

        <Switch>
          <Route path="/users">
            <Users users={users} updateAccountType={updateAccountType} deleteUser={deleteUser} />
          </Route>
          <Route path="/">
            <UserCrud createUser={createUser} />
          </Route>
        </Switch>
      </Router >
    );
  }
}

export default App;
