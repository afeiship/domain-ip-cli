# domain-ip-cli
> Find the fastest IP addresses for a given domain.

## usage
```shell
git clone git@github.com:afeiship/domain-ip-cli.git
pnpm install && pnpm link --global
```

## example
```shell
dic github.com \
    github.github.io \
    assets-cdn.github.com \
    raw.githubusercontent.com \
    npm.pkg.github.com \
    pkg-npm.githubusercontent.com \
    -v
```

> result:
```conf
20.205.243.166	github.com
185.199.110.133	raw.githubusercontent.com

🚀 hosts copied!
```
