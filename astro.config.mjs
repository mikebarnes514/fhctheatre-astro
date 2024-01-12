import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  output: "hybrid",
  adapter: cloudflare({
    mode: "directory",
    imageService: "noop",
  }),
});
