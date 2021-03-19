import { useEffect, useRef } from "react";

function usePrevious(value: any) {
  const ref = useRef<any>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;