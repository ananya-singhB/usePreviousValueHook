import { useRef } from "react";

function usePreviousValue<T>(): [T | undefined, (current: T) => void] {
  const ref = useRef<T | undefined>(undefined);

  const update = (current: T) => {
    ref.current = current;
  };

  return [ref.current, update];
}

export default usePreviousValue;
