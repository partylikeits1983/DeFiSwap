// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "contracts/interfaces/IERC20.sol";

interface StableSwap {
    function exchange(int128 i, int128 j, uint256 dx, uint256 min_dy) external;
}

contract CurveSwap {

    address public STABLE_SWAP = 0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7;

    address public DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address public USDT = 0xdAC17F958D2ee523a2206206994597C13D831ec7;

}
