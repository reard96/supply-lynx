const db = require('../server/db')
const { User, Service } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('synced')
  const users = await Promise.all([
    User.create({ address: '0xef57ccc29d110d19d400a62291fda08447a84381', name: 'Supply Lynx Inc.', category: 'admin' }),
    User.create({ address: '0x3fba4ff7b740248cbc40b237a147fc65fd1514a5', name: 'Ultra Market Ltd.', category: 'buyer' }),
    User.create({ address: '0x45825ce9cddd0f0619ee9371f35428a79fc12200', name: 'Crop Producer Co.', category: 'seller' }),
  ])
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
  ])
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing connection')
    db.close()
    console.log('connection closed')
  })

console.log('seeding')
