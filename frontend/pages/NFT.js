// import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
// import { publicProvider } from "wagmi/providers/public";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";

// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet],
//   [publicProvider()]
// );

// // Set up client
// const client = createClient({
//   autoConnect: true,
//   connectors: [new MetaMaskConnector({ chains })],
//   provider,
//   webSocketProvider,
// });

// // Pass client to React Context Provider
// const NFTs = ({ Component, pageProps }) => {
//   return (
//     <WagmiConfig client={client}>
//       <Component {...pageProps} />
//     </WagmiConfig>
//   );
// };


// // const nft = () => {
// //   return (
// //     <div>
// //       <h1>NFT Page</h1>
// //       NFT 웹 페이지 입니다.
// //     </div>
// //   );
// // };



// export default NFTs;

// import { WagmiConfig, createClient, configureChains, mainnet } from "wagmi";
// import { publicProvider } from "wagmi/providers/public";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { useEffect } from "react";

// const { chains, provider, webSocketProvider } = configureChains(
//   [mainnet],
//   [publicProvider()]
// );

// // Set up client
// const client = createClient({
//   autoConnect: true,
//   connectors: [new MetaMaskConnector({ chains })],
//   provider,
//   webSocketProvider,
// });

// // Pass client to React Context Provider
// const Nfts = ({ Component, pageProps }) => {
//   useEffect(() => {
//     // 컴포넌트가 언마운트될 때 클라이언트 연결 해제
//     return () => {
//       client.disconnect();
//     };
//   }, []);

//   return (
//     <WagmiConfig client={client}>
//       <Component {...pageProps} />
//     </WagmiConfig>
//   );
// };

// export default Nfts;


import { useAccount, useConnect } from "wagmi";
import { useState, useEffect } from "react";
import Header from "../components/NFTHeader";
import LoggedIn from "../components/loggedIn";

import styles from "../styles/Home.module.css";

export default function Home() {
  const { isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isConnected]);

  return (
    <section>
      <Header />
      {isLoggedIn ? (
        <main className={styles.main}>
          <h1 className={styles.title} style={{ marginBottom: "4rem" }}>
            Connect Wallet and Display NFTs
          </h1>
          {connectors.map((connector) => (
            <button
              disabled={!connector.ready}
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
              {!connector.ready && " (unsupported)"}
              {isLoading &&
                connector.id === pendingConnector?.id &&
                " (connecting)"}
            </button>
          ))}
          {error && <section>{error.message}</section>}
        </main>
      ) : (
        <LoggedIn />
      )}
    </section>
  );
}