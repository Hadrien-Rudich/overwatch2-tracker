import { useEffect, useRef, RefObject, useCallback } from 'react';

type EventType = keyof DocumentEventMap;

const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T>, // Ref to the element for which outside click is detected
  callback: () => void, // Callback function to be invoked when click occurs outside the ref element
  eventTypes: EventType[] // Event types to listen for (e.g., ['click', 'touchstart'])
): void => {
  const callbackRef = useRef(callback); // Separate ref to store the callback function

  const handleClickOutside = useCallback(
    (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callbackRef.current(); // Invoke the callback function from the separate ref
      }
    },
    [ref, callbackRef]
  );

  useEffect(() => {
    const cleanupRefs: (() => void)[] = []; // Array to store cleanup functions for event listeners

    // Add event listeners for the specified event types
    eventTypes.forEach((eventType: EventType) => {
      document.addEventListener(eventType, handleClickOutside);
      cleanupRefs.push(() =>
        document.removeEventListener(eventType, handleClickOutside)
      );
    });

    // Cleanup function that runs when the component unmounts or when the dependency array changes
    return () => {
      cleanupRefs.forEach((cleanup) => cleanup()); // Remove event listeners
    };
  }, [eventTypes, handleClickOutside]);
};

export default useOutsideClick;
