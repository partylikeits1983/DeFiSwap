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

    it("Should get DAI and USDT contracts", async () => {
        signers = await ethers.getSigners();
        const Swap = await ethers.getContractFactory("Swap");
        swapcontract = await Swap.deploy();
    });

    it("Should deposit DAI: ", async () => {
        let balance = await dai.balanceOf(daiwhale.address);
        
        await dai.connect(daiwhale).approve(swapcontract.address, balance);
        
        await swapcontract.connect(daiwhale).deposit(DAI, balance);

        let daiBalance = await dai.balanceOf(swapcontract.address);

        expect(balance == daiBalance);

        console.log(daiBalance);
    });

    it("Should swap DAI for USDT: ", async () => {

        let daiBalance = await dai.balanceOf(swapcontract.address);

        await swapcontract.connect(daiwhale).swap(DAI,USDT,daiBalance);

        let usdtBalance = await usdt.balanceOf(swapcontract.address);

        let usdtBalance1 = await swapcontract.balances(daiwhale.address,USDT);

        console.log("dai balance", daiBalance);
        console.log("usdt balance", usdtBalance);
        console.log("usdt balance in contract", usdtBalance1);
    });
    

    it("Should withdraw usdt: ", async () => {

        let usdtBalance = await usdt.balanceOf(swapcontract.address);

        let userBalancet0 = await usdt.balanceOf(daiwhale.address);

        console.log(usdtBalance);
        console.log(swapcontract.address);

        await swapcontract.connect(daiwhale).withdraw(USDT,usdtBalance);

        let userBalancet1 = await usdt.balanceOf(daiwhale.address);

        console.log("dai balance of contract", usdtBalance);
        console.log("added usdt balance of user", userBalancet1 - userBalancet0);
    });

});