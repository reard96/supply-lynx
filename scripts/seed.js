const db = require('../server/db')
const {User, Service} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({userName: 'alice', password: '123', accountAddress: '0x4cf2ED1733016A80a1CF760407a9cdfc01e44fe2', isAdmin: false}),
    User.create({userName: 'jc', password: '123', accountAddress: '0xf48B13DB725b0b7d50644D0D6B1d0d5E14F9FD3C', isAdmin: true}),
    User.create({userName: 'marco', password: '123', accountAddress: '0x3150C0Cbb6e469fa732Ee71223a5d8398EFAD1Ad', isAdmin: true}),
    User.create({userName: 'dan', password: '123', accountAddress: '0x0080F6C410BB26b89B2F64cdfBe76FbbF02451ee', isAdmin: true}),
  ])

  const services = await Promise.all([
    Service.create({name: 'mung bean', productID: 101, category: 'Goods', price: 100}),
    Service.create({name: 'vanilla', productID: 102, category: 'Goods', price: 100}),
    Service.create({name: 'wheat', productID: 103, category: 'Goods', price: 100}),
    Service.create({name: 'truck transport', productID: 104, category: 'Services', price: 1000}),
    Service.create({name: 'ship transport', productID: 105, category: 'Services', price: 1000}),
    Service.create({name: 'loading dock help', productID: 106, category: 'Services', price: 1000}),
    Service.create({name: 'coffee', productID: 107, category: 'Goods', price: 100}),
    Service.create({name: 'rice', productID: 108, category: 'Goods', price: 100}),
    Service.create({name: 'sugar', productID: 109, category: 'Goods', price: 100}),
    Service.create({name: 'cell phones', productID: 110, category: 'Goods', price: 100}),
    Service.create({name: 'laptops', productID: 111, category: 'Goods', price: 100}),
  ])
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
