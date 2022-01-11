# Final project - Auction platform
Deployed version url:

https://elastic-raman-f104a0.netlify.app/home <br />
### How to run this project locally:
<br />
Prerequisites

    Node.js >= v14
    Truffle and Ganache
    npm

Contracts

    Run npm install in project root to install Truffle build and smart contract dependencies
    Run local testnet in port 8545 with an Ethereum client, e.g. Ganache
    truffle migrate --network development
    truffle console --network development
    Run tests in Truffle console: test

Frontend

    cd client
    npm install
    npm run start
    Open http://localhost:3000

How to populate locally deployed contract with listings

    Easiest way would be to run the front-end:
    cd client
    npm run start
    goto: http://localhost:3000/add
    Please connect metamask to port 8545
    

Screencast link


Public Ethereum wallet for certification:

0x30E884ee9817052b09078FEce4Cee7a55BBFD285

# Project description

A user accesses the auction site, finds items they are intersted in and places bids on them. When auction
ends the highest bidder's details are recorded and can pay the item out.

Simple workflow

    Goto website
    Login with Metamask
    Browse auction catalogue
    Bid on items


Directory structure

    client: Project's React frontend.
    contracts: Smart contracts that are deployed in the Ropsten testnet.
    migrations: Migration files for deploying contracts in contracts directory.
    test: Tests for smart contracts.

Environment variables (not needed for running project locally)

INFURA_ROPSTEN_URL=
<br />
MNEMONIC=

TODO features

    Fund withdrawal
    Highest bidder payment
    Auction expiry time
