import React from "react";
import Metamask from '/Users/user_7174/etherscan-moralis-clone/youtube-tutorials/etherscan-clone/frontend/components/metamask.js';


const sendETH = () => {
  return (
    <div className="sendETH">
      <Metamask />
    </div>
  );
};
// 2023.06.02(일) 진행상황
// ethereum 기부 페이지 접근 시 Metamask 계정 연동 제안 기능(metamask.js)

export default sendETH;
