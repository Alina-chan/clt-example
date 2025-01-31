import { SuiClient } from "@mysten/sui.js/client";
import { getObjectsByType } from "./objectQueries";

export function useGetObjects(client: SuiClient) {
  const wrappedGetObjectsByType = async (
    address: string,
    objectType: string
  ) => {
    return getObjectsByType({ address, objectType }, client);
  };

  return {
    getObjectsByType: wrappedGetObjectsByType,
  };
}
