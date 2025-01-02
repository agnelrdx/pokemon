import { useContext } from "react";

import { StateProviderContext } from "@/lib/state-provider";

export const useApiState = () => {
  const context = useContext(StateProviderContext);

  if (context === undefined)
    throw new Error("useApiState must be used within a StateProviderContext");

  return context;
};
