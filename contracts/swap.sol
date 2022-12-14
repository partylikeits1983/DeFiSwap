// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "./curve.sol";

contract Swap is CurveSwap {
    using SafeERC20 for IERC20;

    address public owner;

    // address user => address token => uint balance
    mapping(address => mapping(address => uint)) public balances;

    constructor () {
        owner = msg.sender;
    }

    function deposit(address token, uint amount) public {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        balances[msg.sender][token] = amount;
    }

    function withdraw(address token, uint amount) public {
        require(balances[msg.sender][token] >= amount, "not enough balance");
        balances[msg.sender][token] -= amount;
        IERC20(token).safeTransfer(msg.sender, amount);
    }

    function swap(address tokenIn, address tokenOut, uint amount) public {

        require(balances[msg.sender][tokenIn] >= amount, "not enough balance");

        uint indexIn;
        uint indexOut;

        for (uint i = 0; i < TOKENS.length; i++) {

            if (TOKENS[i] == tokenIn) {
                indexIn = i;
            }
            if (TOKENS[i] == tokenOut) {
                indexOut = i;
            }
        }

        initiateSwap(indexIn, indexOut, amount);

        balances[msg.sender][tokenIn] -= amount;

        uint tokenOutBalance = IERC20(tokenOut).balanceOf(address(this));

        balances[msg.sender][tokenOut] = tokenOutBalance;
    }

}