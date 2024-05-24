import { Signer } from "@mysten/sui.js/cryptography";
import { TransactionBlock } from "@mysten/sui.js/transactions";
import { TREASURY_CAP, PACKAGE_ID, suiClient } from "../config";
import { executeTransaction } from "../utils";
import { useGetObjects } from "../helpers/useGetObjects";

export class OctocatModule {
  // Mint new OctocatX tokens
  async mintTokens(
    amount: number,
    recipient: string,
    signer: Signer
  ): Promise<any> {
    // Create a transaction block
    const txb = new TransactionBlock();

    txb.moveCall({
      target: `${PACKAGE_ID}::octocatx::mint`,
      arguments: [
        txb.object(TREASURY_CAP),
        txb.pure(amount),
        txb.pure(recipient),
      ],
      typeArguments: [`${PACKAGE_ID}::octocatx::OCTOCATX`],
    });

    // Sign and execute the transaction as the admin
    const response = await executeTransaction({ txb, signer });
    return response;
  }

  // Query tokens and calculate total balance for an address
  async getTokensAndCalculateTotalBalance(userAddress: string): Promise<any> {
    const { getObjectsByType } = useGetObjects(suiClient);
    const tokenType = `0x2::token::Token<${PACKAGE_ID}::octocatx::OCTOCATX>`;

    try {
      const tokensRes = await getObjectsByType(userAddress, tokenType);
      let totalBalance = 0;

      for (const token of tokensRes) {
        const balance = token.content.fields.balance;
        totalBalance += parseInt(balance, 10);
      }

      return totalBalance;
    } catch (error) {
      console.error("Error fetching tokens or calculating balance:", error);
    }
  }
}
