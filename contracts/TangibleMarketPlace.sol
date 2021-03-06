pragma solidity >=0.4.22 <0.9.0;
// SPDX-License-Identifier: MIT
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract TangibleMarketPlace {
    struct AuctionItem {
        uint256 id;
        address tokenAddress;
        uint256 tokenId;
        address payable seller;
        uint256 askingPrice;
        bool isSold;
    }
    AuctionItem[] public itemsForSale;
    mapping(address => mapping(uint256 => bool)) activeItems;
    event itemAdded(
        uint256 id,
        uint256 tokenId,
        address tokenAddress,
        uint256 askingPrice
    );

    event itemSold(uint256 id, address buyer, uint256 askingPrice);

    modifier OnlyItemOwner(address tokenAddress, uint256 tokenId) {
        IERC721 tokenContract = IERC721(tokenAddress);
        require(tokenContract.ownerOf(tokenId) == msg.sender);
        _;
    }

    modifier HasTransferApproval(address tokenAddress, uint256 tokenId) {
        IERC721 tokenContract = IERC721(tokenAddress);
        require(tokenContract.getApproved(tokenId) == address(this));
        _;
    }

    modifier ItemExists(uint256 id) {
        require(
            id < itemsForSale.length && itemsForSale[id].id == id,
            "Could not find item"
        );
        _;
    }
    modifier IsForSale(uint256 id) {
        require(itemsForSale[id].isSold == false, "Item was already sold");
        _;
    }

    // 0xc53f6C09783172D21Cc522ff1Dc9c30471f3eA15
    function addItemToMarket(
        uint256 tokenId,
        address tokenAddress,
        uint256 askingPrice
    )
        external
        OnlyItemOwner(tokenAddress, tokenId)
        HasTransferApproval(tokenAddress, tokenId)
        returns (uint256)
    {
        require(
            activeItems[tokenAddress][tokenId] == false,
            "Item is already for sale"
        );
        uint256 newItemId = itemsForSale.length;
        itemsForSale.push(
            AuctionItem(
                newItemId,
                tokenAddress,
                tokenId,
                payable(msg.sender),
                askingPrice,
                false
            )
        );
        activeItems[tokenAddress][tokenId] = true;
        assert(itemsForSale[newItemId].id == newItemId);

        emit itemAdded(newItemId, tokenId, tokenAddress, askingPrice);
        return newItemId;
    }
}
