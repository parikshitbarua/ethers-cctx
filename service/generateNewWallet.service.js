import { ethers } from "ethers";

export const generateNewWallet = (req, res) => {
    const newWallet = ethers.Wallet.createRandom();
    return res.status(200).json({
        address: newWallet.address,
        "private key": newWallet.privateKey,
        message: "New wallet has been created. You can import this wallet into MetaMask using the private key."
    });
}
