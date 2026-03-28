import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mataha Experience",
    short_name: "Mataha",
    description: "This is not an event. This is an experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/logo.jpg",
        sizes: "any",
        type: "image/jpeg",
      },
    ],
  };
}
