import {ethers} from "ethers";

export const validAddressCheck = (req, res) => {
    const body = req.body;
    const addr = body.address;
    const isValid = ethers.isAddress(addr);
    res.status(200).json({
        addr,
        isValid
    });
}
