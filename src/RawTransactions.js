import axios from 'axios';
class RawTransactions {
  constructor(config, baseURL) {
    this.config = config;
    this.baseURL = baseURL;
  }

  createRawTransaction(inputs, outputs, locktime) {
    // creates an unsigned serialized transaction that spends a previous output to a new output with a P2PKH or P2SH address. The transaction is not stored in the wallet or transmitted to the network.

    // Parameter #1—Inputs

    // Parameter #2—P2PKH or P2SH addresses and amounts

    // Parameter #3—locktime

    // Result—the unsigned raw transaction in hex
    let params;
    if(!locktime) {
      params = [
        inputs,
        outputs
      ];
    } else {
      params = [
        inputs,
        outputs,
        locktime
      ];
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"createrawtransaction",
      method: "createrawtransaction",
      params: params
    }, {
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  decodeRawTransaction(rawHex) {
    // decodes a serialized transaction hex string into a JSON object describing the transaction.

    // Parameter #1—serialized transaction in hex

    // Result—the decoded transaction

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"decoderawtransaction",
      method: "decoderawtransaction",
      params: [
        rawHex
      ]
    }, {
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  decodeScript(redeemScript) {
    // decodes a hex-encoded P2SH redeem script.

    // Parameter #1—a hex-encoded redeem script

    // Result—the decoded script
    // console.log('decode script called *****', redeemScript)

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"decodescript",
      method: "decodescript",
      params: [
        redeemScript
      ]
    }, {
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  getRawTransaction(txid, verbose) {
    // NOTE: By default this function only works for mempool transactions. If the -txindex option is
    // enabled, it also works for blockchain transactions.
    // DEPRECATED: for now, it also works for transactions with unspent outputs.
    //
    // Return the raw transaction data.
    //
    // If verbose is 'true', returns an Object with information about 'txid'.
    // If verbose is 'false' or omitted, returns a string that is serialized, hex-encoded data for 'txid'.
    //
    // Arguments:
    // 1. "txid"      (string, required) The transaction id
    // 2. verbose       (bool, optional, default=false) If false, return a string, otherwise return a json object
    //
    // Result (if verbose is not set or set to false):
    // "data"      (string) The serialized, hex-encoded data for 'txid'

    let params;
    if(!verbose) {
      params = [
        txid
      ];
    } else {
      params = [
        txid,
        verbose
      ];
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"getrawtransaction",
      method: "getrawtransaction",
      params: params
    }, {
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  sendRawTransaction(hexstring, allowhighfees) {
    // Submits raw transaction (serialized, hex-encoded) to local node and network.
    //
    // Also see createrawtransaction and signrawtransaction calls.
    //
    // Arguments:
    // 1. "hexstring"    (string, required) The hex string of the raw transaction)
    // 2. allowhighfees    (boolean, optional, default=false) Allow high fees
    //
    // Result:
    // "hex"             (string) The transaction hash in hex
    //

    let params = [];
    if(hexstring) {
      params.push(hexstring);
    }

    if(allowhighfees) {
      params.push(allowhighfees);
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"sendrawtransaction",
      method: "sendrawtransaction",
      params: params
    }, {
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }

  signRawTransaction(hexstring, prevtxs, privkeys, sighashtype) {
  // Sign inputs for raw transaction (serialized, hex-encoded).
  // The second optional argument (may be null) is an array of previous transaction outputs that
  // this transaction depends on but may not yet be in the block chain.
  // The third optional argument (may be null) is an array of base58-encoded private
  // keys that, if given, will be the only keys used to sign the transaction.
  //
  //
  // Arguments:
  // 1. "hexstring"     (string, required) The transaction hex string
  // 2. "prevtxs"       (string, optional) An json array of previous dependent transaction outputs
  //      [               (json array of json objects, or 'null' if none provided)
  //        {
  //          "txid":"id",             (string, required) The transaction id
  //          "vout":n,                  (numeric, required) The output number
  //          "scriptPubKey": "hex",   (string, required) script key
  //          "redeemScript": "hex",   (string, required for P2SH or P2WSH) redeem script
  //          "amount": value            (numeric, required) The amount spent
  //        }
  //        ,...
  //     ]
  // 3. "privkeys"     (string, optional) A json array of base58-encoded private keys for signing
  //     [                  (json array of strings, or 'null' if none provided)
  //       "privatekey"   (string) private key in base58-encoding
  //       ,...
  //     ]
  // 4. "sighashtype"     (string, optional, default=ALL) The signature hash type. Must be one of
  //        "ALL"
  //        "NONE"
  //        "SINGLE"
  //        "ALL|ANYONECANPAY"
  //        "NONE|ANYONECANPAY"
  //        "SINGLE|ANYONECANPAY"
  //        "ALL|FORKID"
  //        "NONE|FORKID"
  //        "SINGLE|FORKID"
  //        "ALL|FORKID|ANYONECANPAY"
  //        "NONE|FORKID|ANYONECANPAY"
  //        "SINGLE|FORKID|ANYONECANPAY"

    let params = [];
    if(hexstring) {
      params.push(hexstring);
    }

    if(prevtxs) {
      params.push(prevtxs);
    }

    if(privkeys) {
      params.push(privkeys);
    }

    if(sighashtype) {
      params.push(sighashtype);
    }

    return axios.post(this.baseURL, {
      jsonrpc: "1.0",
      id:"signrawtransaction",
      method: "signrawtransaction",
      params: params
    }, {
      auth: {
        username: this.config.username,
        password: this.config.password
      }
    })
    .then((response) => {
      return response.data.result;
    })
    .catch((error) => {
      return JSON.stringify(error.response.data.error.message);
    });
  }
}

export default RawTransactions;
