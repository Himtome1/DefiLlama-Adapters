const { sumTokens2 } = require("../helper/unwrapLPs");

// Polygon contracts
const QCN_TOKEN_CONTRACT = "0xB9D159fe28b30548fAD18A6ba8727C3E36154589"; // QCN
const QCN_LP_TOKEN_CONTRACT = "0xeFf6a4E866320db8B52cdD227570D8133B74D1b1"; // POL-QCN LP
const QCN_YIELD_FARM_CONTRACT = "0x41de2364E15EfCC279505Ec55B94b22A484d297e"; // Yield Farm

async function tvl(api) {
  // Query LP token balance held by farm
  const lpBalance = await api.call({
    abi: "erc20:balanceOf",
    target: QCN_LP_TOKEN_CONTRACT,
    params: [QCN_YIELD_FARM_CONTRACT],
  });



  // Try unwrapping into underlying assets
  const balances = await sumTokens2({
    api,
    tokensAndOwners: [[QCN_LP_TOKEN_CONTRACT, QCN_YIELD_FARM_CONTRACT]],
    resolveLP: true, // ensure unwrapping happens
  });


  return balances;
}

module.exports = {
  methodology:
    "TVL counts the POL-QCN LP tokens staked in the QCN Yield Farm contract. These LP tokens are unwrapped into their underlying POL and QCN values for USD attribution.",
  polygon: {
    tvl,
  },
};
