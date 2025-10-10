
export const getTokenBalance = async (address: string) => {
    if (!address) {
        console.log('Wallet not connected');
        return 0;
    }
    try {
        const tokenMintAddress = "tbd";
        console.log("tokenMintAddress", tokenMintAddress);

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