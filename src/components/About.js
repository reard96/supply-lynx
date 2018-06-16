import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const About = ({ classes }) => {
  const bullet = <span className={classes.bullet}>•</span>;
  return (
    <div>
      <Paper>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} color='textSecondary'>
              About
          </Typography>
            <Typography variant='headline' component='h2'>
              Lynx
          </Typography>
            <Typography className={classes.pos} color='textSecondary'>
              A solution for the logistics challenge faced by producers, suppliers, and wholesalers.
          </Typography>
            <Typography variant='subheading'>
              Why does Lynx exist?
            </Typography>
            <Typography variant='body1'>
              Supply chains are incredibly complex. They often span multiple geographies and involve several stakeholders. Goods can take months to flow to the end user.

              Currently, there is a lack of transparency in the supply chain. Producers, middlemen, and wholesalers don't know:
              1. Where goods come from - the path they've taken to get to the present location
              2. When goods are moved from place to place
              3. The quality and authenticity of goods

              Lynx utilizes blockchain technology to help solve some of these problems. The first step: a smart contract marketplace built on the Ethereum blockchain.
            </Typography>
            <Typography>
              Introduction to blockchain
            </Typography>
            <Typography variant='body1'>
              A blockchain is a distributed digital ledger.

              The key innovations of a blockchain are:
              - **Immutability.** Transaction records cannot be changed ex post facto, making information much more difficult to falsify
              - **Transparency.** Everyone can see the previous transactions made.
              - **Disintermediation.** There is no need for a trusted third party to verify transactions.
              - **Security.** A robust decentralized blockchain is much less vulnerable to attack than a centralized (traditional enterprise) system.
            </Typography>
            <Typography variant='subheading'>
              The difference between blockchain and cryptocurrency
            </Typography>
            <Typography variant='body1'>
              **_THIS SECTION NEEDS TO BE REWORDED...I NEED TO TALK TO SOME PEOPLE AND THINK ABOUT THIS A LITTLE BIT_**

              A blockchain is a copy of all of the transactions made in a network, which all network participants (can) have a copy of. Each block contains a record of transactions, which are then cryptographically verified as a "bundle". Once a given number of network participants agree on this "block of transactions", the block is added to the ledger, or chain.

              A cryptocurrency is a form of digital currency built using blockchain technology. In the physical realm, it is easy to ensure that one person paying another actually has the money necessary to facilitate the transaction. If you hand me $10 in cash, I now possess one more $10 bill, and you possess one fewer.

              However, this becomes more difficult in the digital realm. With a digital currency, I could conceivably copy my "digital $10" an infinite number of times and use it for many transactions. A "trusted third party" (generally a bank) is needed to ensure that I do not do this. When I use my debit card on Amazon, my bank deducts the balance from my account. Both Amazon and I trust the bank to ensure that the $10 is credited and debited correctly.

              Cryptocurrencies eliminate the need for a trusted third party. Because everyone has a copy of the ledger, we all know exactly how much "digital money" is in each account. Through a cryptographic protocol, all of the transactions are verified and the correct accounts are debited and credited.

              But aren't cryptocurrencies just contrived? Do they actually have any value?

              #### Sidenote regarding money
              Since we normally transact in currencies issued by governments, it is a common misconception that those [fiat currencies](https://en.wikipedia.org/wiki/Fiat_money) are the only form of money. However, these are a relatively recent technology and are not synonomous with the concept of money.

              Money has three neccesisary components. It is a:
              1. [Medium of exchange](https://en.wikipedia.org/wiki/Medium_of_exchange)
              2. [Unit of account](https://en.wikipedia.org/wiki/Unit_of_account)
              3. [Store of value](https://en.wikipedia.org/wiki/Store_of_value)

              If something fulfills these three criteria, it is money. In short, _if a sufficient number of people believe something to be money - and use it as a medium of exchange, a unit of account, and a store of value - it **is** money._
            </Typography>
            <Typography variant='subheading'>
              Introduction to smart contracts
            </Typography>
            <Typography variant='body1'>
              Historically, contracts have been written and interpreted by human beings. Smart contracts are written in code. When certain conditions defined in the contract are met, the contract will automatically execute, and ownership of an asset is transferred, money is distributed...whatever the smart contracts says will happen, happens.
            </Typography>
            <Typography variant='subheading'>
              Ethereum
            </Typography>
            <Typography variant='body1'>
              Ethereum is a cryptocurrency that easily allows smart contracts to be coded into its blockchain. For this reason, many applications can be built on it and it is the most popular blockchain for developers. Lynx's smart contract marketplace was built using the Ethereum blockchain.

              ### Further reading
              - [3b1b explains how cryptocurrencies work](https://www.youtube.com/watch?v=bBC-nXj3Ng4&vl=en)
              - [Bitcoin White Paper](https://bitcoin.org/bitcoin.pdf)
              - [Ethereum White Paper](https://github.com/ethereum/wiki/wiki/White-Paper)
            </Typography>
            <Typography variant='subheading'>
              Advantages of blockchain in the supply chain
            </Typography>
            <Typography variant='body1'>
              Because a blockchain is immutable, it increases the transparency of the supply chain. Blockchain technology also has a built-in ownership record, making it easy to see the chain of command of any particular asset.

              For example, a diamond company could use blockchain to track diamonds from the ground to the end consumer, ensuring the stones are genuine and that any conflict/blood diamonds are avoided.[[1]](https://www.forbes.com/sites/bernardmarr/2018/03/14/how-blockchain-could-end-the-trade-in-blood-diamonds-an-incredible-use-case-everyone-should-read/#599ccb1f387d)

              Blockchain technology is also being used to track tuna in order to try to combat illegal fishing practices.[[2]](http://theconversation.com/how-blockchain-is-strengthening-tuna-traceability-to-combat-illegal-fishing-89965)

              While blockchain works great in the digital world, crossing the chasm from the world of bits to the world of atoms sheds light on some outstanding issues. For goods to be tracked through the supply chain on the blockchain, it is important that the information actually _reaches_ the blockchain. The goods need to be scanned or the information needs to be otherwise uploaded by humans - this is still a weak point in the system.
            </Typography>
            <Typography variant='subheading'>
              How to use Lynx
            </Typography>
            <Typography variant='body1'>
              1. Ensure that you are using Chrome, Firefox, or Opera as a web browser
              2. Download [MetaMask](https://metamask.io/)
              _FURTHER INSTRUCTIONS HERE ONCE THIS IS DEPLOYED_
          </Typography>
          </CardContent>
        </Card>
      </Paper>
    </div >
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);
