import { providers } from "ethers";
import { getWalletClient, GetWalletClientResult } from "@wagmi/core";

export function walletClientToSigner(walletClient?: GetWalletClientResult): providers.JsonRpcSigner | undefined {
    const { account, chain, transport } = walletClient || {};

    if (!walletClient || !account?.address || !chain || !transport) return undefined;

    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain?.contracts?.ensRegistry?.address,
    };

    return new providers.Web3Provider(transport, network).getSigner(account.address);
}

/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getSignerFromWagmi({ chainId }: { chainId?: number } = {}): Promise<providers.JsonRpcSigner | undefined> {
    return walletClientToSigner(await getWalletClient({ chainId }));
}
