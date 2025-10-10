import "./globals.css";
import LayoutWrapper from './LayoutWrapper';

import {ReactNode} from "react";

export const metadata = {
    title: '飞鸟冲天 Flappy BNB',
    description: 'Your fortune game on BNB',
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
