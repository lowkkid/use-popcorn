import { useEffect } from "react";
import { APP_TITLE } from "../constants";

export function useDocumentTilte(title) {
  useEffect(
    function () {
      if (!title) return;
      document.title = title;
      return () => (document.title = APP_TITLE);
    },
    [title]
  );
}
