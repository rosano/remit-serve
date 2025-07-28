# Remit Serve

Single-file Node.js app that maps paths to external URLs.

First, set `WHITELIST_PREFIXES` to comma-separated URLs in `.env`, maybe something like:

```bash
WHITELIST_PREFIXES="https://just-a-domain.com,https://or-also-including.a/path/"
```

Then Remit Serve will basically map `remit-domain.com/https://just-a-domain.com/bravo` to `https://just-a-domain.com/bravo` as long as it matches a whitelist prefix.

It's recommended to use trailing slashes on the paths.

---

Dockerfiles are for [easy](https://easyindie.app) deployment to [Cloudron](cloudron.io) and [Caprover](https://caprover.com).

Forks [remit](https://github.com/rosano/remit).
