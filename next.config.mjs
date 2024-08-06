/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites: async () => {
    return [
      {
        source: "/projects/computer-graphics/gravity-simulator.html",
        destination: "/computer-graphics-files/gravity-simulator.html",
      },
      {
        source: "/projects/computer-graphics/mandlebrot-and-julia-sets.html",
        destination: "/computer-graphics-files/mandlebrot-and-julia-sets.html",
      },
      {
        source: "/projects/computer-graphics/raytracer.html",
        destination: "/computer-graphics-files/raytracer.html",
      },
      {
        source: "/projects/computer-graphics/ring-toss.html",
        destination: "/computer-graphics-files/ring-toss.html",
      },
      {
        source: "/projects/computer-graphics/procedural-textures.html",
        destination: "/computer-graphics-files/procedural-textures.html",
      },
      {
        source: "/projects/computer-graphics/terra-firma.html",
        destination: "/computer-graphics-files/terra-firma.html",
      },
    ];
  },
};

export default nextConfig;
