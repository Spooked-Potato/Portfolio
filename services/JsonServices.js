class JsonService {
  constructor(jsonPath) {
    this.path = jsonPath;
  }

  async getLocations() {
    return fetch(this.path).then((response) => response.json());
  }
}
