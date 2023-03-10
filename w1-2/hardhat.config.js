require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = '-vBjkqpkavKN5Kw4h50BIa7ttF-sMdTZ'

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: ['0x87e0eba9c86c494d98353800571089f316740b0cb84c9a7cdf2fe5c9997c7966'],
    },
  }
};
