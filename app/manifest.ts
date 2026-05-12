import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TEAMUP AI",
    short_name: "TEAMUP",
    description: "AI-powered turf booking and sports community SaaS.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4fbfa",
    theme_color: "#14b8a6",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml"
      }
    ]
  };
}
