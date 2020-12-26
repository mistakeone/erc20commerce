pragma solidity ^0.6.2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/// ONLY FOR TESTNET!
/// FOR MAINNET USE > 0x6b175474e89094c44da98b954eedeac495271d0f
contract Dai is ERC20 {
    constructor() ERC20('Dai Stablecoin', 'Dai') public {}

    function faucet(address to, uint amount) external {
        _mint(to, amount);
    }
}

// docker run -name mongodb1 -p 27017:27017 mongo
