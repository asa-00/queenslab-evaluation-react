/** These functions provide a simple event handling mechanism for the document object in the browser environment. */

// subscribe: Registers an event listener function to be called when an event of the specified type occurs.
export function subscribe(
  eventName: string,
  listener: EventListenerOrEventListenerObject
): void {
  document.addEventListener(eventName, listener);
}

// unsubscribe: Removes a previously registered event listener function from the document.
export function unsubscribe(
  eventName: string,
  listener: EventListenerOrEventListenerObject
): void {
  document.removeEventListener(eventName, listener);
}

// publish: Dispatches a custom event of the specified type with optional data attached, triggering any registered event listeners for that type.
export function publish(eventName: string, data?: object): void {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}
