const { expect, assert } = require("chai");
const { parseUnits } = require("ethers/lib/utils");
const { ethers, network } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const USDT = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const daiWHALE = "0x2FAF487A4414Fe77e2327F0bf4AE2a264a776AD2";

describe("Curve Swap", () => {
    let signers;
    let daiwhale;

    let dai;
    let usdt;

    // main contract
    let swapcontract;

    before(async () => {
        await network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [daiWHALE],
        });

        daiwhale = await ethers.getSigner(daiWHALE);
        dai = await ethers.getContractAt("IERC20", DAI);
        usdt = await ethers.getContractAt("IERC20", USDT);
    });

    it("Should deploy contract: ", async () => {
        signers = await ethers.getSigners();
        const Swap = await ethers.getContractFactory("Swap");
        swapcontract = await Swap.deploy();

        let owner = await swapcontract.owner();
        console.log(owner);
    });


});