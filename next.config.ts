import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // <--- ADD THIS LINE
  },
};

// module.exports = {
//   output: "export",
// };


export default nextConfig;
