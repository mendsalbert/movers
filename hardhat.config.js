require("@nomiclabs/hardhat-waffle");
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