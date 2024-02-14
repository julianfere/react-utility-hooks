export class UnsuportedClient extends Error {
  constructor() {
    super("useLocalStorage is a client only hook");
    this.name = "UnsuportedClient";
  }
}
