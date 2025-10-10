import React, {useEffect} from 'react';
import ConnectWalletButton from "@/app/components/ConnectWalletButton";
import {useWallet} from "@solana/wallet-adapter-react";
import {beautifyNumber} from "@/utils";

interface LowBalancePageProps {
    requiredBalance: number;
    background: "dreams" | "pink";
    balance: number;
}

const dreamsBackgroundStyle = {
    backgroundImage: 'url(/dreams-b.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}

const pinkBackgroundStyle = {
    backgroundImage: 'linear-gradient(to bottom right, #7e22ce, #ec4899, #ef4444)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
};

const _getBackgroundStyle = (style: string) => {
    switch(style) {
        case "dreams":
            return dreamsBackgroundStyle;
        case "pink":
            return pinkBackgroundStyle;
        default:
            return pinkBackgroundStyle;
    }
}

const LowBalancePage: React.FC<LowBalancePageProps> = ({requiredBalance, balance, background}) => {
    const { publicKey, connected} = useWallet()

    const style = _getBackgroundStyle(background)
    console.log("style", style)

    useEffect(() => {
        console.log("connected", connected)
        if (publicKey) {
            console.log(`connected to wallet ${publicKey}`)
            console.log("balance", balance)
        }
    }, [publicKey, connected])

    if (!connected) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div
                    className="min-h-screen w-[90%] sm:w-[80%] flex flex-col items-center justify-center bg-cover bg-center text-white rounded-2xl shadow-lg"
                    style={{
                        backgroundImage: 'url(/dreams-b.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="text-center bg-black bg-opacity-50 p-4 sm:p-6 rounded-lg max-w-md">
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 animate-pulse">
                            Connect Your Wallet 🔑
                        </h2>
                        <h5 className="text-sm sm:text-lg font-medium">
                            To access this premium feature, please connect your wallet.
                        </h5>
                    </div>
                    <div className="mt-4">
                        <ConnectWalletButton />
                    </div>
                    {/* Decorative Animation */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute bg-dream-pink opacity-10 w-72 h-72 rounded-full -top-25 -left-5 animate-ping"></div>
                        <div className="absolute bg-dream-pink opacity-10 w-96 h-96 rounded-full -bottom-40 -right-10 animate-pulse"></div>
                        <div className="absolute bg-dream-pink opacity-5 w-48 h-48 rounded-full bottom-20 left-40 animate-pulse"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Render the main premium content if the publicKey is provided
    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center text-white"
            style={style}
        >
            {/* Animated Header */}
            <div className="text-center">
                <h2 className="text-4xl font-extrabold mb-4 animate-pulse">
                    Premium Feature Access 🚀
                </h2>
                <h5 className="text-lg font-medium max-w-2xl mx-auto">
                    🚧 We&apos;re working hard to make this feature accessible to everyone. For now, only premium holders with at least {beautifyNumber(requiredBalance)}
                    can access it. Stay tuned! 🚧
                </h5>
                <h6> Your current balance is {balance}</h6>
            </div>

            {/* Decorative Animation */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute bg-white opacity-10 w-72 h-72 rounded-full -top-20 -left-20 animate-ping"></div>
                <div className="absolute bg-white opacity-10 w-96 h-96 rounded-full -bottom-40 -right-10 animate-pulse"></div>
                <div className="absolute bg-white opacity-5 w-48 h-48 rounded-full bottom-20 left-40 animate-pulse"></div>
            </div>
        </div>
    );
};

export default LowBalancePage;
