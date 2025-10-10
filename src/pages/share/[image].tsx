import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface SharePageProps {
    imageUrl: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { image } = context.params!;

    // Decode the URL
    const imageUrl = decodeURIComponent(image as string);

    return {
        props: {
            imageUrl,
        },
    };
};

const SharePage: React.FC<SharePageProps> = ({ imageUrl }) => {
    const title = 'Check out my score on FlappyCz!';
    const description = 'Generated on Flappy CZ, the ultimate bnb game.';

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />

                {/* Twitter/X Card Metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@FlappyCZ" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />

                {/* Open Graph Metadata */}
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:type" content="website" />
            </Head>

            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
                <img
                    src={imageUrl}
                    alt="Generated Image"
                    className="rounded-lg shadow-md max-w-full"
                />
            </main>
        </>
    );
};

export default SharePage;
