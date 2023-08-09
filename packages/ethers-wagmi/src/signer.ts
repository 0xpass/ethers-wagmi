// see https://wagmi.sh/react/ethers-adapters

import { providers } from "ethers";
import { type WalletClient } from "wagmi";
import {getWalletClient} from "@wagmi/core";

export function walletClientToSigner(walletClient: WalletClient) {
    const { account, chain, transport } = walletClient;
    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
    };
    // @ts-ignore
    const provider = new providers.Web3Provider(transport, network);
    return provider.getSigner(account.address);
}


/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getSignerFromWagmi({
                                          chainId,
                                      }: { chainId?: number } = {}): Promise<providers.JsonRpcSigner | undefined> {
    const walletClient = await getWalletClient({ chainId });
    if (!walletClient) return undefined;
    return walletClientToSigner(walletClient);
}