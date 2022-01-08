// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Auction {
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

    function addItem(
        uint _basePrice,
        string memory _title,
        string memory _description,
        string memory _imgUrl
    ) public {
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
        require(catalogue[itemId].available, "Item does not exist or is not applicable for bidding.");

        catalogue[itemId].highestBid = amount;
        catalogue[itemId].highestBidder = msg.sender;

        emit LogBidPlaced(catalogue[itemId].title, amount);
    }
}
