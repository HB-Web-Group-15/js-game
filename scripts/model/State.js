/**
 * This is a simple state management class used to track state changes and notify subscribers when the state changes. It allows for subscribing to state changes, updating the state, and retrieving the current state.
 * @method subscribe(listener) - Adds a listener function that will be called whenever the state changes. Returns a function to unsubscribe the listener.
 * @method setState(newState) - Updates the state with the provided new state and notifies all subscribers of the change.
 * @method getState() - Returns a copy of the current state to prevent direct manipulation.
 * @method notify() - Calls all subscribed listener functions with the current state.
 */
export default class State {
	#state;
	#listeners;
	constructor(initialState = {}) {
		this.#state = initialState;
		this.#listeners = [];
	}

	subscribe(listener) {
		this.#listeners.push(listener);
		return () => {
			this.#listeners = this.#listeners.filter((l) => l !== listener);
		};
	}

	setState(newState) {
		this.#state = { ...this.#state, ...newState };
		this.notify();
	}

	getState() {
		return structuredClone(this.#state); // Return a copy to prevent direct manipulation
	}

	notify() {
		this.#listeners.forEach((listener) => listener(this.getState()));
	}
}
