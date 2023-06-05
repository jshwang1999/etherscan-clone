import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import Logo from "../public/assets/logo.png";

// import Home from "../components/home.js"

export default function Header() {
  const [ethPrice, setEthPrice] = useState("");

  useEffect(() => {
    const getEthPrice = async () => {
      const response = await axios.get("http://localhost:5001/getethprice", {});
      setEthPrice(response.data.usdPrice);
    };
    getEthPrice();
  });

  return (
    <section className={styles.header}>
      <section className={styles.topHeader}>
        ETH Price:{" "}
        <span className={styles.blueText}>${Number(ethPrice).toFixed(2)}</span>
      </section>
      <section className={styles.navbar}>
        <Image src={Logo} alt="Etherscan Logo" className={styles.logo} />
        <section className={styles.menu}>
          <a href ="/">Home</a>
          <a href ="/exchange">ETH Exchange</a>
          <a href ="/nft">NFTs</a>
          <a href ="/sendETH">send ETH</a>
        </section>
      </section>
    </section>
  );
} 
// --> <p> 태그에서 <a href ="/">Home</a>로 변환한 케이스

