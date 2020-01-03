/*
  Mock data used for unit testing.
*/

module.exports = {
  bestBlockHash:
    "0000000000000000008e1f65f875703872544aa888c7ca6587f055f8f5fbd4bf",

  blockHeader: {
    hash: "000000000000000005e14d3f9fdfb70745308706615cfa9edca4f4558332b201",
    confirmations: 85727,
    height: 500000,
    version: 536870912,
    versionHex: "20000000",
    merkleroot:
      "4af279645e1b337e655ae3286fc2ca09f58eb01efa6ab27adedd1e9e6ec19091",
    time: 1509343584,
    mediantime: 1509336533,
    nonce: 3604508752,
    bits: "1809b91a",
    difficulty: 113081236211.4533,
    chainwork:
      "0000000000000000000000000000000000000000007ae48aca46e3b449ad9714",
    previousblockhash:
      "0000000000000000043831d6ebb013716f0580287ee5e5687e27d0ed72e6e523",
    nextblockhash:
      "00000000000000000568f0a96bf4348847bc84e455cbfec389f27311037a20f3"
  },

  txOutProof:
    "0000002086a4a3161f9ba2174883ec0b93acceac3b2f37b36ed1f90000000000000000009cb02406d1094ecf3e0b4c0ca7c585125e721147c39daf6b48c90b512741e13a12333e5cb38705180f441d8c7100000008fee9b60f1edb57e5712839186277ed39e0a004a32be9096ee47472efde8eae62f789f9d7a9f59d0ea7093dea1e0c65ff0b953f1d8cf3d47f92e732ca0295f603c272d5f4a63509f7a887f2549d78af7444aa0ecbb4f66d9cbe13bc6a89f59e05a199df8325d490818ffefe6b6321d32d7496a68580459836c0183f89082fc1b491cc91b23ecdcaa4c347bf599a62904d61f1c15b400ebbd5c90149010c139d9c1e31b774b796977393a238080ab477e1d240d0c4f155d36f519668f49bae6bd8cd5b8e40522edf76faa09cca6188d83ff13af6967cc6a569d1a5e9aeb1fdb7f531ddd2d0cbb81879741d5f38166ac1932136264366a4065cc96a42e41f96294f02df01",

  verifiedProof:
    "03f69502ca32e7927fd4f38c1d3f950bff650c1eea3d09a70e9df5a9d7f989f7",

  txOutUnspent: {
    bestblock:
      "000000000000000000b441e02f5b1b9f5b3def961047afcc6f2f5636c952705e",
    confirmations: 2,
    value: 0.00006,
    scriptPubKey: {
      asm:
        "OP_DUP OP_HASH160 d19fae66b685f5c3633c0db0600313918347225f OP_EQUALVERIFY OP_CHECKSIG",
      hex: "76a914d19fae66b685f5c3633c0db0600313918347225f88ac",
      reqSigs: 1,
      type: "pubkeyhash",
      addresses: ["bitcoincash:qrgeltnxk6zltsmr8sxmqcqrzwgcx3eztusrwgf0x3"]
    },
    coinbase: false
  }
}
