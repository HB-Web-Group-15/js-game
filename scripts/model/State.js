/**
 * This is a simple state management class used to track state changes and notify subscribers when the state changes. It allows for subscribing to state changes, updating the state, and retrieving the current state.
 * @method subscribe(listener) - Adds a listener function that will be called whenever the state changes. Returns a function to unsubscribe the listener.
 * @method setState(newState) - Updates the state with the provided new state and notifies all subscribers of the change.
 * @method getState() - Returns a copy of the current state to prevent direct manipulation.
 * @method notify() - Calls all subscribed listener functions with the current state.
 */
export default class State {
  #oldState;
  #state;
  #listeners;
  constructor(initialState = {}) {
    this.#oldState = initialState;
    this.#state = initialState;
    this.#listeners = [];
  }

  /**
   * Subscribes a listener function to the state changes.
   * @param {(newState: {}, oldState: {}) => void} listener
   * @returns {Function} A function to unsubscribe the listener.
   */
  subscribe(listener) {
    this.#listeners.push(listener);
    return () => {
      this.#listeners = this.#listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Updates the state with the provided new state and notifies all subscribers of the change.
   * @param {Object} newState - An object containing the new state properties to be merged with the current state.
   */
  setState(newState) {
    this.#oldState = this.#state;
    this.#state = { ...this.#state, ...newState };
    this.notify();
  }

  /**
   * Returns a copy of the current state to prevent direct manipulation.
   * @returns {Object} A copy of the current state to prevent direct manipulation.
   */
  getState() {
    return structuredClone(this.#state); // Return a copy to prevent direct manipulation
  }

  /**
   * Calls all subscribed listener functions with the current state.
   */
  notify() {
    this.#listeners.forEach((listener) =>
      listener(this.#state, this.#oldState),
    );
  }
}
