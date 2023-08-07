import { ethers } from "ethers";

export const validAddressCheck = (req, res) => {
    const body = req.body;
    const { address } = body;
    const isValid = ethers.isAddress(address);
    res.status(200).json({
        address,
        isValid
    });
}
