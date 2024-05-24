import { PACKAGE_ID, PRIVATE_KEY, suiClient } from "../config";
import { useGetObjects } from "../helpers/useGetObjects";
import { getSuiAddress, writeLogToFile } from "../utils";

(async () => {
  const { getObjectsByType } = useGetObjects(suiClient);

  try {
    const tokensRes = await getObjectsByType(
      getSuiAddress(PRIVATE_KEY),
      `0x2::token::Token<${PACKAGE_ID}::octocatx::OCTOCATX>`
    );

    console.log("tokensRes: ", tokensRes);
    writeLogToFile("tokensRes", tokensRes, "Querying OCTOCATX tokens");
  } catch (error) {
    console.error("Failed to read tokens:", error);
  }
})();
