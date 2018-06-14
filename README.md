# Lynx

- **[Lynx Alpha Site](https://google.com)** _insert link here once deployed_
- **[Video Demo](https://google.com)** _insert video demo here once filmed_

Lynx connects suppliers & wholesalers and brings transparency to the supply chain by utilizing smart contracts built on the Ethereum blockchain.

This application was built in three weeks as a Capstone Project for the Flex Immersive program at [Fullstack Academy](https://www.fullstackacademy.com/).

Because Lynx is not intended for commercial use (yet!), the Ganache test blockchain was used for deployment, rather than the Ethereum Main Network, where payment (gas) is required to make transactions. 

### Contributors
- [Marco Chen](https://github.com/marcopchen) (Scrum Master)
- [Alice Luong](https://github.com/alicel73)
- [JC Mauras](https://github.com/jmauras24)
- [Dan Reardon](https://github.com/reard96)

## App Functionality

Lynx allows users to post goods for sale and purchase the goods that other users are selling.

When a user posts goods for sale, they create a smart contract that is deployed to the Ethereum network. Once this contract is accepted by another user, the smart contract executes. 

All transactions can be viewed using our intuitive dashboard. Users can check the status of their existing orders, as well as see all of the orders that have taken place on the platform.

_INSERT A SCREENSHOT OR TWO HERE_

Interested buyers can browse goods or services for sale, view specific item details, view the seller's public profile (which includes a transaction history), as well as message a seller regarding an item. Once a buyer places an order, the existing transaction on the blockchain is updated to include the buyer's information, along with the status of the order.

When an order is fulfilled, the buyer can complete the order, which will update the status on the blockchain one final time and trigger the transfer of funds. Both the buyer and seller will then be able to view their transaction ID on the blockchain.

Users can also access all of their pending orders and completed transactions easily from their user dashboard.

_INSERT SENTENCE ABOUT ANALYTIC DASHBOARD ONCE THAT IS ADDED_

## Tech Stack

* [Solidity](http://solidity.readthedocs.io/en/latest/) for programming smart contracts
* [Web3](https://web3js.readthedocs.io/en/1.0/) to allow our application to interact with the blockchain 
* [Truffle](http://truffleframework.com/) and [Ganache](http://truffleframework.com/ganache/) - Ethereum dev environment for testing
* [MetaMask](https://metamask.io/) for user login; allows interaction with the application using a digital wallet on the Ethereum network 
* [Material UI](https://material-ui.com/) & CSS for styling
* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/) and [Redux](https://redux.js.org/)

_INSERT d3 if we're using this for dashboards..._

## Implementation

The core logic of our application is in the smart contract, which was written in Solidity. Our contract stored all of the relevant information necessary for an item listing on the blockchain, in lieu of a traditional backend:
- productId
- quantity
- price
- unit
- order status
- etc.

In addition to stack that we learned in class (Node.js, Express, React), we had to learn several new technologies in order to incorporate the blockchain into our application. Web3 was used to interact with the blockchain. Truffle & Ganache were used in conjunction in order to test our contracts. Ganache provides 10 test user accounts, each with a digital wallet balance of 100 ETH. We then imported those accounts into MetaMask, a Chrome plugin that serves as an in-browser digital wallet. From there we were able to simulate transactions between users.

This app is deployed live at _LINK_. 

INPUT RUN INSTRUCTIONS HERE ONCE WE HAVE APPLICATION 100% FINISHED 

## Further Development


## Implementation

All of our user transactions were facilitated by a smart contract written in a language called Solidity. Our contract included three functions: one to create a new agreement, which is called when a user posts something for sale; a function to update the transaction when a buyer places an order; and a third function to complete the transaction after the order is fulfilled.



With scalability in mind, we made the conscious choice to keep only the most pertinent information relating to transactions on the blockchain, and to store the rest of our data in a PostgreSQL database. Not only does it take more time to query the blockchain, but every function call costs a small amount of ether ("gas"), so we wanted to minimize calls to the blockchain. To protect the integrity of our database, we used promises to ensure that we would post to our database ONLY after receiving a successful response from the blockchain. We believe that this decision would lead to a more seamless and less costly experience for our users.



---
Built with ❤️ in New York City
