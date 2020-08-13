

const Realm = require('realm');

const Product = {
  name: 'Product',
  primaryKey: 'id',
  properties: {
    id: 'int',
    product_id: 'int',
    name:  'string',
    price: 'int',
    image: 'string',
    weight: 'double',
    quantity: 'int',
    status: 'int',
  }
};

const Provider = {
  name: 'Provider',
  primaryKey: 'id',
  properties: {
    id: 'int',
    provider_id: 'int',
    town_id: 'string',
    name:  'string',
    types: 'string?[]',
    address: 'string',
    product: {type: 'list', objectType: 'Product'},
  }
}
const config = {
  schema: [Provider, Product],
  schemaVersion: 1,
}

export const delProduct = (provider_id, product) => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let provider = realm.objects('Provider').filtered(`provider_id = "${provider_id}" `);
    if(provider[0].product.length === 1) {
      result1 = realm.objects('Product').filtered(`product_id = "${product.product_id}" `)
      realm.write(() => {
        realm.delete(result1)
        realm.delete(provider)
      })
    }else {
      let result = realm.objects('Product').filtered(`product_id = "${product.product_id}" `);
      realm.write(() => {
        realm.delete(result)
      })
    }
    // console.log(provider[0].product.length)
    // for(let i of provider) {
    //   console.log(i)
    // }
    
  })
})

export const quantity = (action, data) => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let result = realm.objects('Product').filtered(`product_id = "${data.product_id}"`);
    if(action === 'add') {
      if(data.quantity < data.status) {
        realm.write(() => {
          result[0].quantity = result[0].quantity+1;
        })
      }
    }else {
      if(result[0].quantity !== 1) {
        realm.write(() => {
          result[0].quantity = result[0].quantity-1;
        })
      }
    }
    resolve(result)
  })
  .catch(error => {
    reject(error)
  })
})

export const insert = data => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let newData = realm.objects('Provider').filtered(`provider_id = "${data.provider_id}" `);
    if(newData.length===0) {
      realm.write(() => {
        realm.create('Provider', data);
        resolve(data)
      })
    }else {
      let a = realm.objects('Product').filtered(`product_id = "${data.product[0].product_id}" `)
      if(a.length === 0) {
        realm.write(() => {
          newData[0].product.push(data.product[0])
        })
      }else {
        realm.write(() => {
          a[0].quantity = a[0].quantity+1;
          resolve(data)
        })
      }
    }
  }).catch(error => {
    reject(error)
  })
})

//show all
export const showAll = () => new Promise((resolve, reject) => {
  Realm.open(config).then(realm => {
    let all = realm.objects('Provider')
  //   for (let p of all) {
  // }
    resolve(all);
  })
  .catch(error => {
    reject(error)
  }
  )
})

export default new Realm(config);

