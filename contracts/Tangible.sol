// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "./Collectible.sol";

contract Tangible is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Item {
        Collectible collectible;
        uint256 id;
        address creator;
        string uri;
    }

    constructor() ERC721("Tangible", "TANG") {}

    mapping(uint256 => Item) public items;
    event ItemCreated(
        string uri,
        uint256 _tokenId,
        address owner,
        address collectible
    );

    function createItem(string memory uri) public returns (uint256) {
        // increment token id

        _tokenIds.increment();
        // get id of the newly created token
        uint256 _tokenId = _tokenIds.current();
        // mint the token
        Collectible _collectible = new Collectible(this, _tokenId, uri);
        _safeMint(msg.sender, _tokenId);
        items[_tokenId] = Item(_collectible, _tokenId, msg.sender, uri);
        // emit event showing the uri, the token id and the address of the owner
        emit ItemCreated(
            uri,
            _tokenId,
            msg.sender,
            address(items[_tokenId].collectible)
        );
        return _tokenId;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return items[tokenId].uri;
    }

    fallback() external payable {}
}

// /Users/fabriciopolicarpo/Desktop/Projects/drizzle-react-tutorial/node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol
