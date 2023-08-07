import { ethers } from 'ethers';
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.ALCHEMY_PROVIDER_KEY;

// Replace with your actual Infura API_KEY key in .env
const provider = new ethers.AlchemyProvider('mainnet', API_KEY);

const getLatestConfirmedTransactions = async (latestNBlocks, numOfTrxs) => {
    try {
        const latestBlockNumber = await provider.getBlockNumber();
        const transactionPromises = [];

        // Fetch transactions from the latest block to the LATEST_N_BLOCKS ago
        for (let i = 0; i < latestNBlocks; i++) {
            const blockNumber = latestBlockNumber - i;
            const block = await provider.getBlock(blockNumber);

            if (!block) {
                console.log(`Block ${blockNumber} not found`);
                continue;
            }

            // Push all transactions from the block to the transactionPromises array
            transactionPromises.push(...block.transactions);
        }

        // Wait for all transaction promises to resolve
        let transactions = await Promise.all(transactionPromises);
        transactions = transactions.slice(0,Number(numOfTrxs));

        // Filter out any undefined transactions (failed to fetch)
        return transactions.filter(tx => tx !== undefined);
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
}

export const getLatestTransactionDetails = async (req, res) => {
    const body = req.body;
    const numOfTrxs = body.numOfTrxs;
    // each block contains about 2000 transactions, so accordingly we are quering the required number of blocks
    const latestNBlocks = Math.ceil(numOfTrxs/2000);
    console.log(latestNBlocks);
    const confirmedTrxHashes = await getLatestConfirmedTransactions(latestNBlocks,numOfTrxs);
    const latestTrxDetails = [];
    for (let i = 0; i < confirmedTrxHashes.length; i++) {
        // get trx details from each hash
        const TransactionResponse = await provider.getTransaction(confirmedTrxHashes[i]);
        latestTrxDetails.push({
            "transaction hash": TransactionResponse.hash,
            "block number": TransactionResponse.blockNumber,
            "from": TransactionResponse.from,
            "to": TransactionResponse.to,
            "ether value": ethers.formatEther(TransactionResponse.value)
        })
    }
    return res.status(200).json(latestTrxDetails);
}
