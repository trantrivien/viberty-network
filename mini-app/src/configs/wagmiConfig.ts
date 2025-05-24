import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi'
import { arbitrum, base, mainnet, optimism, polygon, sepolia } from 'wagmi/chains'

export const config = getDefaultConfig({
    appName: "My RainbowKit App",
    projectId: "YOUR_PROJECT_ID",
    chains: [mainnet, polygon, optimism, arbitrum, base],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})
