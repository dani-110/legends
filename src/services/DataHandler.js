class DataHandler {
  store;
  recentlyLoggedIn = false;

  setStore(store) {
    this.store = store;
  }

  setRecentlyLoggedIn(recentlyLoggedIn) {
    this.recentlyLoggedIn = recentlyLoggedIn;
  }

  getStore() {
    return this.store;
  }

  getRecentlyLoggedIn() {
    return this.recentlyLoggedIn;
  }
}

export default new DataHandler();
