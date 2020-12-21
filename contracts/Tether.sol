pragma solidity ^0.6.2;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

/// ONLY FOR TESTNET!
/// FOR MAINNET USE > 0xdac17f958d2ee523a2206206994597c13d831ec7
contract Tether is ERC20 {
    constructor() ERC20('Tether Stablecoin', 'USDT') public {}

    function faucet(address to, uint amount) external {
        _mint(to, amount);
    }
}