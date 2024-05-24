import { PRIVATE_KEY } from "../config";
import { getSuiAddress } from "../utils";
import { OctocatModule } from "../modules/OctocatModule";

(async () => {
  try {
    const octocat = new OctocatModule();

    const balanceRes = await octocat.getTokensAndCalculateTotalBalance(
      getSuiAddress(PRIVATE_KEY)
    );

    console.log("balanceRes: ", balanceRes);
  } catch (error) {
    console.error("Failed to read balance:", error);
  }
})();
