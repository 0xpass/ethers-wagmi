import {HttpTransport, PublicClient} from "viem";
import {providers} from "ethers";
import {getPublicClient} from "@wagmi/core";


export function publicClientToProvider(publicClient: PublicClient): providers.JsonRpcProvider {
    const { chain, transport } = publicClient
    if(!chain) throw new Error('chain is undefined')

    const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain?.contracts?.ensRegistry?.address,
    }
    if (transport.type === 'fallback')
        { // @ts-ignore
            return new providers.FallbackProvider(
                        (transport.transports as ReturnType<HttpTransport>[]).map(
                            ({ value }) => new providers.JsonRpcProvider(value?.url, network ),
                        ),
                    )
        }
    // @ts-ignore
    return new providers.JsonRpcProvider(transport.url, network)
}


/** Action to convert a viem Wallet Client to an ethers.js Signer. */
export async function getProviderFromWagmi({
                                             chainId,
                                         }: { chainId?: number } = {}): Promise<providers.JsonRpcProvider | undefined> {
    const publicClient = await getPublicClient({ chainId });
    if (!publicClient) return undefined;
    return publicClientToProvider(publicClient);
}