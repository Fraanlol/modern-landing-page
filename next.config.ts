import fs from "fs";
import path from "path";
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Resolve the project root using the filesystem's canonical path
// based on the location of this config file. This avoids relying on
// the current working directory and preserves filesystem casing.
const projectRoot = fs.realpathSync(__dirname);

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
  output: "standalone",
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
