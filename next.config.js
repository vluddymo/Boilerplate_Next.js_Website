/* eslint-env node */
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'randomuser.me' , 'localhost'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
};
// eslint-disable-next-line no-undef
module.exports = nextConfig;