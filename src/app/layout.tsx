import "./globals.css";
import LayoutWrapper from './LayoutWrapper';

import "@solana/wallet-adapter-react-ui/styles.css";
import {ReactNode} from "react";

export const metadata = {
    title: 'Meta Muse',
    description: 'Your Sexy AI assistant for Solana',
};

export default async function RootLayout({ children }: { children: ReactNode }) {

    return (
        <LayoutWrapper >
            <html lang="en">
            <body>
            <main className={`min-h-screen`}>
                {children}
            </main>
            </body>
            </html>
        </LayoutWrapper>

    );
}
