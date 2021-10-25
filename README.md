# ethcrud
Crud project using ERC20 smart contracts.


How to run in local:

WALLET CONFIGURATION:
1. Add metamask plugin to your browser.
2. Select Ropsten network in your metamask wallet.
3. Buy fake ether from ropsten faucet.

Install truffle in your local machine
1. npm install -g truffle
2. npm install in root of the project.

React project
1. cd client/
2. npm install to install all packages.
3. npm start 

If you want to redeploy contracts to ropsten network.
1. Add your address private key in .secrets.json
2. Add your etherscan api key in .secrets.json
3. truffle migrate --reset --network ropsten

If you want to verificate the smart contract in etherscan ropsten network.
1. add etherscan api key to .secrets.json https://etherscan.io/myapikey
2. truffle run verify Casino --network rinkeby