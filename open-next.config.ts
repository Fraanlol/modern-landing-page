module.exports = {
  default: {
    override: {
      wrapper: "cloudflare-node",
      converter: "node",
      incrementalCache: "cloudflare-kv",
      tagCache: "cloudflare-kv",
      queue: "cloudflare-queue",
    },
  },
};
