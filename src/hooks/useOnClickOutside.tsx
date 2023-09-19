import { useEffect } from "react";

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (event: React.SyntheticEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener(
      "mousedown",
      listener as unknown as EventListener,
    );
    document.addEventListener(
      "touchstart",
      listener as unknown as EventListener,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        listener as unknown as EventListener,
      );
      document.removeEventListener(
        "touchstart",
        listener as unknown as EventListener,
      );
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
