<div align="center">
  <a href="https://ipfs.infura.io/ipfs/Qmade64cdA3YaNfThD8Pr5AVedwhxHa213AYbr5J5h7waH">
    <img width="200" src="public/house.ico" alt="logo">
  </a>

  <h3 align="center">Movers</h3>

  <p align="center">
    Properties Management platform with Blockchain!
    <br />
    <a href="https://github.com/kwakyebrilliant/Movers"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://moversv2.vercel.app/">View App</a>
    
  </p>
</div>

<!-- ABOUT THE PROJECT -->

## About The Project

<img src="public/screenshot.jpeg" alt="screenshot" width="" >

# What it does
Making use of blockchain technology, we present to you Movers, an property management platform that seeks simplify property management processes with blockchain. By doing so, we offer you an easy way to trade properties amongst users. And what we seek to achieve is to make the property management processes more transparent to end users.

There are about four (4) user types (that is buyer, seller, lender and approver) that is captured on the platform. Among the four (4) user types, a user can perform an activity on the platform by choosing the user type they represent and then proceed to provide to make the exchange of a property a smooth sail. The user is also to ensure that metamask is installed in their browser. Below are steps a user can undertake to perform an activity on the platform:

- The buyer can view a property and once interested can proceed to buy the property.
- The seller can approve the sale of the property to enable the process, if not, the bid amount will be returned to the buyer. The seller after all other process will finally approve the sale to release the property to the buyer and then receive the bid amount.
- The inspector will approve inspection once everything is in order for the next process.
- The lender finally approve and lend the property for the seller to finally approve the property.


All media are stored on IPFS.


# Built With
This section should list any major frameworks/libraries used to bootstrap your project. Leave any add-ons/plugins for the acknowledgements section. Here are a few examples.
- [React.js](https://reactjs.org/)
- [React-Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/)
- [Solidity](https://docs.soliditylang.org/en/v0.8.13/)
- [IPFS](https://ipfs.io/)

# Getting started
The project consist of the backend and also the front end.

### Prerequisites
- nodejs installed
- npm
- Hardhat
 ```
npm install npm@latest -g
npm install -g hardhat
```

### Local setup
To run this project locally, follow these steps.
1. Clone the project locally, change into the directory, and install the dependencies:
```
git clone https://github.com/kwakyebrilliant/Movers

cd Auditra2

# install using NPM or Yarn
npm install

# or

yarn
```

2. Start the local Hardhat node

```sh
npx hardhat node
```

3. With the network running, deploy the contracts to the local network in a separate terminal window

```sh
npx hardhat run scripts/deploy.js --network localhost
```

4. Start the app

```
npm run dev
```

### Configuration

The chain ID should be 80001. If you have a localhost rpc set up, you may need to overwrite it.

To deploy to Polygon test or main networks, update the configurations located in **hardhat.config.js** to use a private key and, optionally, deploy to a private RPC like Infura.

```javascript
// require("@nomicfoundation/hardhat-toolbox");
/* hardhat.config.js */
require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
// const privateKey = fs.readFileSync("secret.txt").toString();
const projectId = "8b7ba5517c414450a93ec7334975a7fe";
const privatekey1 =
  "";
const privatekey2 =
  "";
const privatekey3 =
  "";
const privatekey4 =
  "";
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337,
    },

    mainet: {
      url: `https://palm-mainnet.infura.io/v3/${projectId}`,
      // accounts: [privateKey],
    },
    matic: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/2bGIFu-iEnl9RvAOTe1ddZI2gBnuYQGS",
      accounts: [privatekey1, privatekey2, privatekey3, privatekey4],
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
```


If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

# License
Distributed under the MIT License.

# Contact
- Brilliant Kwakye - https://twitter.com/a_moah__
- Mends Albert - https://twitter.com/mendalbert
