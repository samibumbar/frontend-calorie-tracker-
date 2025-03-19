"use client";

import { useEffect, useState } from "react";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import type { Persistor } from "redux-persist";

export function PersistProvider({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <Provider store={store}>{children}</Provider>;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor as Persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
