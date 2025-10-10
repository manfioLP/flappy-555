import { GetServerSideProps } from 'next';
import Head from 'next/head';

interface SharePageProps {
    imageUrl: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    console.log("context query", context.query)
    const imageUrl = context.query.image as string;

    if (!imageUrl) {
        return {
            notFound: true, // Handle cases where no image URL is provided
        };
    }

    // const parsedImageUrl = decodeURIComponent(imageUrl as string);


    return {
        props: {
            imageUrl: decodeURIComponent(imageUrl),
        },
    };
};

const SharePage: React.FC<SharePageProps> = ({ imageUrl }) => {
    const title = 'Check out my score at FlappyCz!';
    const description = 'Generated with FlappyCz, the ultimate BNB game.';

    return (
        <>
            <Head>
                {/* Standard Metadata */}
                <title>{title}</title>
                <meta name="description" content={description} />

                {/* Twitter/X Card Metadata */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@FlappyCz" />
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
