import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { polygonAmoy } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "PolyThreads",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Get from https://cloud.walletconnect.com
  chains: [polygonAmoy],
  ssr: true,
});
