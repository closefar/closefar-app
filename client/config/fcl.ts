import { config } from "@onflow/fcl";
import { ACCESS_NODE_URLS } from "../constants";
import flowJSON from "../flow.json";
import * as api from "@api";

const flowNetwork = process.env.NEXT_PUBLIC_FLOW_NETWORK;

console.log("Dapp running on network:", flowNetwork);

const accountProofDataResolver = async () => {
  try {
    const nonce = await api.getNonce();
    console.log(nonce);
    return {
      // e.g. "Awesome App (v0.0)" - A human readable string to identify your application during signing
      appIdentifier: "closefar",

      // e.g. "75f8587e5bd5f9dcc9909d0dae1f0ac5814458b2ae129620502cb936fde7120a" - minimum 32-byte random nonce as hex string
      nonce,
    };
  } catch (error) {
    console.log(error);
  }
};

// config({
//   'flow.network': flowNetwork,
//   'accessNode.api': ACCESS_NODE_URLS[flowNetwork],
//   'discovery.wallet': `https://fcl-discovery.onflow.org/${flowNetwork}/authn`,
//   'app.detail.icon': 'https://avatars.githubusercontent.com/u/62387156?v=4',
//   'app.detail.title': 'FCL Next Scaffold'
// }).load({ flowJSON })
config({
  "flow.network": flowNetwork,
  "accessNode.api": ACCESS_NODE_URLS[flowNetwork],
  // "discovery.wallet": `http:/localhost:8701/fcl/authn`,
  "discovery.wallet": `https://fcl-discovery.onflow.org/testnet/authn`,
  "discovery.authn.endpoint": `https://fcl-discovery.onflow.org/api/testnet/authn`,
  // "app.detail.icon": "https://avatars.githubusercontent.com/u/62387156?v=4",
  // "app.detail.title": "CLOSEFAR",
  "fcl.accountProof.resolver": accountProofDataResolver,
  "walletconnect.projectId": "60f3e5d3232106199b7e49319cece762",
}).load({ flowJSON });
