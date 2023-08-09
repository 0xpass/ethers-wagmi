import {useWalletClient} from "wagmi";
import {walletClientToSigner} from "@0xpass/ethers-wagmi/src";
import {useMemo} from "react";
import { providers } from "ethers";

/** Hook to convert a viem Wallet Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}): providers.JsonRpcSigner | undefined {
    const { data: walletClient } = useWalletClient({ chainId })
    return useMemo(
        () => (walletClient ? walletClientToSigner(walletClient) : undefined),
        [walletClient],
    )
}