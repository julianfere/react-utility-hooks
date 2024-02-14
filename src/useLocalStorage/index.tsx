import { useEffect, useRef } from "react";
import { UnsuportedClient } from "./Errors";

/**
 *  Hook to handle localStorage
 *
 * @returns
 * - getItem: Function to get an item from localStorage
 * - setItem: Function to set an item in localStorage
 * - removeItem: Function to remove an item from localStorage
 * - hasItem: Function to check if an item exists in localStorage
 * - clear: Function to clear all items from localStorage
 *
 */
const useLocalStorage = <Type extends Record<string, any>>() => {
  const storageRef = useRef(window?.localStorage);

  useEffect(() => {
    if (!storageRef.current) throw new UnsuportedClient();
  }, []);

  const getItem = <Key extends keyof Type>(key: Key) => {
    const returnedItem = storageRef.current.getItem(key as string);

    if (!returnedItem) return null;

    const parsedItem: Type[typeof key] = JSON.parse(returnedItem);

    return parsedItem;
  };

  const setItem = (key: keyof Type, value: Type[typeof key]) => {
    storageRef.current.setItem(key as string, JSON.stringify(value));
  };

  const removeItem = (key: keyof Type) => {
    storageRef.current.removeItem(key as string);
  };

  const hasItem = (key: keyof Type) => {
    return !!storageRef.current.getItem(key as string);
  };

  const clear = () => {
    storageRef.current.clear();
  };

  return { getItem, setItem, removeItem, hasItem, clear };
};

export default useLocalStorage;
