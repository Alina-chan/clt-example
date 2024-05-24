import { OctocatModule } from "../modules/OctocatModule";
import { PRIVATE_KEY } from "../config";
import { getSigner, getSuiAddress } from "../utils";

(async () => {
  try {
    const octocat = new OctocatModule();

    const mintRes = await octocat.mintTokens(
      35,
      getSuiAddress(PRIVATE_KEY),
      getSigner(PRIVATE_KEY)
    );

    console.log("mintRes: ", mintRes);
  } catch (error) {
    console.error("Failed to mint tokens:", error);
  }
})();
