/** @type {import('next').NextConfig} */
const securityHeaders = [
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Content-Security-Policy",
    value: "upgrade-insecure-requests",
  },
];
module.exports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    domains: ["m.media-amazon.com"],
  },
};
