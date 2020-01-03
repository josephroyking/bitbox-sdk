// imports
import * as assert from "assert";
import axios from "axios";
import * as sinon from "sinon";
import { BITBOX, REST_URL } from "../../lib/BITBOX"
import { Mining } from "../../lib/Mining"

// consts
const bitbox: BITBOX = new BITBOX()

describe("#Mining", (): void => {
  describe("#MiningConstructor", (): void => {
    it("should create instance of Mining", (): void => {
      const mining: Mining = new Mining()
      assert.equal(mining instanceof Mining, true)
    })

    it("should have a restURL property", (): void => {
      const mining: Mining = new Mining()
      assert.equal(mining.restURL, REST_URL)
    })
  })

  describe("#getBlockTemplate", (): void => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get block template", done => {
      const data = {
        data:
          "01000000017f6305e3b0b05f5b57a82f4e6d4187e148bbe56a947208390e488bad36472368000000006a47304402203b0079ff5b896187feb02e2679c87ac2fb8d483b60e0721ed33601e2c0eecc700220590f8a0e1a51b53b368294861fd5fc99db3a6607d0f4e543f6217108e208c1834121024c93c841d7f576584ffbf513b7abd8283e6562669905f6554f788fce4cc67a34ffffffff0228100000000000001976a914af78709a76abc8a28e568c9210c8247dd10cff2c88ac22020000000000001976a914f339927678803f451b41400737e7dc83c6a8682188ac00000000",
        txid:
          "7f462d71c649a0d8cfbaa2d20d8ff86677966b308f0ac9906ee015bf4453f97a",
        hash:
          "7f462d71c649a0d8cfbaa2d20d8ff86677966b308f0ac9906ee015bf4453f97a",
        depends: [],
        fee: 226,
        sigops: 2
      }

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bitbox.Mining.getBlockTemplate("")
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe("#getMiningInfo", (): void => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get mining info", done => {
      const data = {
        blocks: 527816,
        currentblocksize: 89408,
        currentblocktx: 156,
        difficulty: 568757800682.7649,
        blockprioritypercentage: 5,
        errors: "",
        networkhashps: 4347259225696976000,
        pooledtx: 184,
        chain: "main"
      }

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bitbox.Mining.getMiningInfo()
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })

  describe("#getNetworkHashps", (): void => {
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should get network hashps", done => {
      const data: number = 3586365937646890000

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "get").returns(resolved)

      bitbox.Mining.getNetworkHashps()
        .then((result: any) => {
          assert.equal(data, result)
        })
        .then(done, done)
    })
  })

  describe("#submitBlock", (): void => {
    // TODO finish
    let sandbox: any
    beforeEach(() => (sandbox = sinon.sandbox.create()))
    afterEach(() => sandbox.restore())

    it("should TODO", done => {
      const data: any = {}

      const resolved = new Promise(r => r({ data: data }))
      sandbox.stub(axios, "post").returns(resolved)

      // @ts-ignore
      bitbox.Mining.submitBlock()
        .then((result: any) => {
          assert.deepEqual(data, result)
        })
        .then(done, done)
    })
  })
})
