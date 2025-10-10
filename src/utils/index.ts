import {Connection, PublicKey} from '@solana/web3.js';

export const getTokenBalance = async (publicKey: PublicKey) => {
    if (!publicKey) {
        console.log('Wallet not connected');
        return 0;
    }
    try {
        const tokenMintAddress = new PublicKey('ASEvGp9qiW2LmSCeZGSDM5jxzs8o6iXgnn3ZPqGupump');

        const connection = new Connection(
            process.env.NEXT_PUBLIC_HELIUS_URL || 'https://api.devnet.solana.com',
            'confirmed',
        );

        const walletTokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, {
            mint: tokenMintAddress
        })

        if(walletTokenAccounts && walletTokenAccounts.value && walletTokenAccounts.value.length > 0){
            const walletTokenAccount = walletTokenAccounts.value[0]
            return walletTokenAccount.account.data.parsed.info.tokenAmount.uiAmount
        }

        return 0;
    } catch (error) {
        console.error('Error fetching token balance', error);
    }
};

export const beautifyNumber = (num: number) => {
    const formatNumber = (value: number, divisor: number, suffix: string) => {
        const result = value / divisor;
        if (result % 1 === 0) {
            return result + suffix;
        } else {
            return result.toFixed(1) + suffix;
        }
    };

    if (num < 1000) return String(num);
    if (num < 1000000) return formatNumber(num, 1000, 'K');
    if (num < 1000000000) return formatNumber(num, 1000000, 'M');
    return formatNumber(num, 1000000000, 'B');
}