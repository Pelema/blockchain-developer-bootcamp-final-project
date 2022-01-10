const Auction = artifacts.require("./Auction.sol");

contract("Auction", accounts => {
    const [contractOwner, alice] = accounts;

    beforeEach(async () => {
        instance = await Auction.new();
    });

    /**
 * Checks that the contract inherits OpenZeppelin Ownable by using owner()
 */
    it("should add first account as owner using OpenZeppelin Ownable", async () => {
        assert.strictEqual(await instance.owner(), owner);
    });


    it("should not allow bidding on unavailable items", async () => {
        const ownerEnrolled = await instance.enrolled(contractOwner, { from: contractOwner });
        assert.equal(
            ownerEnrolled,
            false,
            "only enrolled users should be marked enrolled",
        );
    });


    it("should only accept bids higher than current highest", async () => {
        await instance.enroll({ from: alice });
        await instance.deposit({ from: alice, value: deposit });
        const balance = await instance.getBalance.call({ from: alice });

        assert.equal(
            deposit.toString(),
            balance,
            "deposit amount incorrect, check deposit method",
        );

        it("should log a bid event when a bid is placed", async () => {
            await instance.enroll({ from: alice });
            const result = await instance.deposit({ from: alice, value: deposit });

            const expectedEventResult = { accountAddress: alice, amount: deposit };

            const logAccountAddress = result.logs[0].args.accountAddress;
            const logDepositAmount = result.logs[0].args.amount.toNumber();

            assert.equal(
                expectedEventResult.accountAddress,
                logAccountAddress,
                "LogDepositMade event accountAddress property not emitted, check deposit method",
            );

            assert.equal(
                expectedEventResult.amount,
                logDepositAmount,
                "LogDepositMade event amount property not emitted, check deposit method",
            );
        });
    });
})