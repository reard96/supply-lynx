const db = require('../server/db');
const { User, Service } = require('../server/db/models');

async function seed() {
  await db.sync({ force: true });
  console.log('synced');
  // run `web3.eth.accounts` in Truffle console to fetch addresses from Ganache
  const addresses =
    ['0xef57ccc29d110d19d400a62291fda08447a84381',
      '0x3fba4ff7b740248cbc40b237a147fc65fd1514a5',
      '0x45825ce9cddd0f0619ee9371f35428a79fc12200',
      '0xd36a808421aa30dbd621e831f1d78511592ebeca',
      '0x17eb1cd016d58d81e066a3aafba67ea3328b9990',
      '0x2046583c34182d6a6d76bddf48e0d21e008aeb44',
      '0xcf971a483eccfd2d41f05042c18cf3e3612fe7ff',
      '0x9e70e44103ef95f62e609f12cfaf6c11f88e3314',
      '0x1e27631326cc22addbdbaeacea9e1d6038570ff6',
      '0xe9a5403ce8635d96b56573c6b6d4e03849f91c6c'];
  const users = await Promise.all([
    User.create({ address: addresses[0], name: 'Supply Lynx Inc.', category: 'admin' }),
    User.create({ address: addresses[1], name: 'Ultra Market Ltd.' }),
    User.create({ address: addresses[2], name: 'Whole Retail Ltd.' }),
    User.create({ address: addresses[3], name: 'Main Chain Ltd.' }),
    User.create({ address: addresses[4], name: 'Block Mart Ltd.' }),
    User.create({ address: addresses[5], name: 'Make Everything Co.' }),
    User.create({ address: addresses[6], name: 'Max Wholesale Co.' }),
    User.create({ address: addresses[7], name: 'Super Producer Co.' }),
    User.create({ address: addresses[8], name: 'Mega Supplier Co.' }),
    User.create({ address: addresses[9], name: 'All Goods Co.' }),
  ]);
  const services = await Promise.all([
    Service.create({ name: 'mung bean' }),
    Service.create({ name: 'vanilla' }),
    Service.create({ name: 'wheat' }),
    Service.create({ name: 'coffee' }),
    Service.create({ name: 'rice' }),
    Service.create({ name: 'sugar' }),
    Service.create({ name: 'cotton' }),
    Service.create({ name: 'mushroom' }),
    Service.create({ name: 'potato' }),
    Service.create({ name: 'apple' }),
    Service.create({ name: 'banana' }),
    Service.create({ name: 'soy bean' }),
    Service.create({ name: 'tobacco' }),
    Service.create({ name: 'coconut' }),
    Service.create({ name: 'barley' }),
    Service.create({ name: 'corn' }),
  ]);
}

seed()
  .catch(err => {
    console.error(err.message);
    console.error(err.stack);
    process.exitCode = 1;
  })
  .then(() => {
    console.log('closing connection');
    db.close();
    console.log('connection closed');
  });

console.log('seeding');
