export default async function ({ store, from }) {
    // if (!from || from.name === 'login' || from.name === 'index') {
    //   await store.dispatch('getUserDetails')
    //   await store.dispatch('getUserCreditReport')
    // }
    // if (!from || from.name === 'login' || from.name === 'index') {

    await store.dispatch('getCoinMarketData')
    await store.dispatch('getUserDetails')
    
  }
  