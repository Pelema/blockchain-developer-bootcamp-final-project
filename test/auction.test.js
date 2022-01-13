const Auction = artifacts.require("./Auction.sol");

const getErrorObj = (obj = {}) => {
    const txHash = Object.keys(obj)[0];
    return obj[txHash];
  };

contract("Auction", accounts => {
    const [contractOwner, alice] = accounts;

    const createItem = async (instance) => {
        await instance.addItem(
          web3.utils.toWei("0.00022"),
          "Ponay",
          "Gray Ponay.",
          "https://somesite",
        );
      };

    beforeEach(async () => {
        instance = await Auction.new();
        await createItem(instance)
    });

    /**
 * Checks that the contract inherits OpenZeppelin Ownable by using owner()
 */
    it("should add first account as owner using OpenZeppelin Ownable", async () => {
        assert.strictEqual(await instance.owner(), contractOwner);
    });


    it("should not allow bidding on unavailable items", async () => {
        try {
            await instance.bid(200, web3.utils.toWei("0.00024"));
          } catch (e) {
            const { error, reason } = getErrorObj(e.data);
            assert.equal(error, "revert");
            assert.equal(reason, "Item does not exist or is not applicable for bidding.");
          }
    });


    it("should only accept bids higher than base amount", async () => {

        try {
            await instance.bid(100, web3.utils.toWei("0.0001"));
          } catch (e) {
            const { error, reason } = getErrorObj(e.data);
            assert.equal(error, "revert");
            assert.equal(reason, "Bid should be higher than base amount.");
          }
    });

    it("should only accept bids higher than current highest", async () => {
        await instance.bid(100, web3.utils.toWei("0.0003"));
        try {
            await instance.bid(100, web3.utils.toWei("0.00025"));
          } catch (e) {
            const { error, reason } = getErrorObj(e.data);
            assert.equal(error, "revert");
            assert.equal(reason, "Bid should be higher than previous.");
          }
    });

    it("should log a bid event when a bid is placed", async () => {
        const result = await instance.bid(100, web3.utils.toWei("0.0003"));

        const expectedEventResult = { itemId: 100, amount: web3.utils.toWei("0.0003")};

        const logItemID = result.logs[0].args.itemId;
        const logBidAmount = result.logs[0].args.amount.toNumber();

        assert.equal(
            expectedEventResult.itemId,
            logItemID,
            "LogBidMade event itemId property not emitted, check bid method",
        );

        assert.equal(
            expectedEventResult.amount,
            logBidAmount,
            "LogBidMade event amount property not emitted, check bid method",
        );
    });
})