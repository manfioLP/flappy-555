import "./globals.css";
import LayoutWrapper from './LayoutWrapper';

import {ReactNode} from "react";

export const metadata = {
    title: 'Flappy 555',
    description: 'Your favorite Jupiter game on Solana',
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
