// useDebugValue는 React DevTools에서 커스텀 훅에 라벨을 추가할 수 있게 해주는 React Hook입니다.

// useDebugValue(value, format?);

import { useSyncExternalStore, useDebugValue } from "react";

export function useOnlineStatus() {
  const isOnline = useSyncExternalStore(
    subscribe,
    () => navigator.onLine,
    () => true
  );
  useDebugValue(isOnline ? "Online" : "Offline");
  return isOnline;
}

function subscribe(callback: () => void) {
  window.addEventListener("online", callback);
  window.addEventListener("offline", callback);
  return () => {
    window.removeEventListener("online", callback);
    window.removeEventListener("offline", callback);
  };
}

export default function StatusBar() {
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? "Online" : "Disconnected"}</h1>;
}
