pragma solidity ^0.6.2;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';

contract PaymentProcessor {
    address public admin;
    IERC20 public dai;
    // IERC20 public usdt;
    uint paymentCount;
    event PaymentDone(
        address payer,
        uint amount,
        uint paymentId,
        uint date
    );

    struct thePayment(
        address payer,
        uint amount,
        uint paymentId,
        uint date
    );

    mapping (uint id=> thePayment) public view allPayments;

    constructor(address adminAddress, address daiAddress) public {
        admin = adminAddress;
        dai = IERC20(daiAddress);
    }

    function pay(uint amount, uint paymentId) external {
        dai.transferFrom(msg.sender, admin, amount);
        emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
        paymentCount++;
        allPayments[paymentCount-1] = thePayment(msg.sender, amount, paymentId, block.timestamp);

    }
    function lastPayment() external view returns (allPayments[paymentCount-1]) {
        require(paymentCount>0, 'no payments recorded');
        require(msg.sender == admin, 'not an admin');

    }
}