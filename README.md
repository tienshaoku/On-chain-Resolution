# On-chain Resolution

On-chain Resolution is a set of Smart Contracts that help people with setting/participating in resolution goals, attesting them and settling with the reward/punishments.

This project is built by @tienshaoku during ETH Taipei 2024, while Scaffold-OP 🏗🔴 cannot be omitted from this description for its immense help on FE development 🙇

## Local Development

1. `yarn install`

2.

```
yarn chain
yarn deploy
yarn start
```

and open `http://localhost:3000`

## Non-local Deployment

1. Fill in `DEPLOYER_PRIVATE_KEY` in `.env`

2. `yarn deploy --network-options` or `yarn deploy --network networkName`; `networkName` can be found in `hardhat.config.js`

## Documentation

Visit the original [repo](https://github.com/ethereum-optimism/scaffold-op) to get a full view of this amazing project!

Pro tip: get familiar with it before hackathons 😉
