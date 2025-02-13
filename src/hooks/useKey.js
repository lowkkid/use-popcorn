import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function () {
      const callback = (e) =>
        e.code.toLowerCase() === key.toLowerCase() && action();

      document.addEventListener("keydown", callback);

      return () => document.removeEventListener("keydown", callback);
    },
    [key, action]
  );
}
