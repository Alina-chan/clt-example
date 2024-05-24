# OctocatX Contract Deployment and Usage

## Publishing the Contract

To publish the contract on the testnet, run the following script:

```sh
./publish.sh testnet
```

This script will populate the .env file with all the necessary configuration.

## Minting OCTOCATX Tokens

To mint some tokens and transfer them to your local address, run:

```sh
pnpm run mintToken
```

### Querying Tokens

To see all OctocatX tokens under your local address, run:

```sh
pnpm run getTokens
```

Example output of querying OCTOCATX tokens can be found under `scripts/tokensRes.json`

### Calculating Total Token Balance

To query all OctocatX tokens and calculate the total balance from all of them, run:

```sh
pnpm run getTokenBalance
```
