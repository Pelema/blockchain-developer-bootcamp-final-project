// SPDX-License-Identifier: MIT
pragma solidity 0.8.10;
import "@openzeppelin/contracts/access/Ownable.sol";


/// @title An auction management contract
/// @author Pelema A. 
/// @notice This is still experimental, not  for production
contract Auction is Ownable {
    uint begins;
    uint ends;
    uint itemIdCounter = 100;
    uint itemCount = 0;
    uint[] public idList;

    // Stored list of items available for aution
    mapping(uint256 => Item) public catalogue;
    struct Item {
        uint itemId;
        uint basePrice;
        string title;
        string description;
        string imgUrl;
        uint highestBid;
        address highestBidder;
        bool available;
    }

    constructor() {}

    event LogItemAdded(string indexed title, uint indexed basePrice);
    event LogBidPlaced(string indexed title, uint indexed amount);

    /// @param _basePrice Lowest amount to bid
    function addItem(
        uint _basePrice,
        string memory _title,
        string memory _description,
        string memory _imgUrl
    ) public onlyOwner {
        catalogue[itemIdCounter] = Item({
            itemId: itemIdCounter,
            title: _title,
            description: _description,
            imgUrl: _imgUrl,
            basePrice: _basePrice,
            highestBid: 0,
            highestBidder: address(0),
            available: true
        });
        idList.push(itemIdCounter);
        itemCount++;
        itemIdCounter++;
        emit LogItemAdded(_title, _basePrice);
    }

    function get() public view returns (Item[] memory) {
        Item[] memory ret = new Item[](itemCount);
        for (uint i = 0; i < itemCount; i++) {
            ret[i] = catalogue[idList[i]];
        }
        return ret;
    }

    function bid(uint itemId, uint amount) public {
        // require(!isOwner(msg.sender));
        require(catalogue[itemId].available, "Item does not exist or is not applicable for bidding.");
        require(catalogue[itemId].highestBid < amount, "Bid should be higher than previous.");

        catalogue[itemId].highestBid = amount;
        catalogue[itemId].highestBidder = msg.sender;

        emit LogBidPlaced(catalogue[itemId].title, amount);
    }
}
