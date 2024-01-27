#!/usr/bin/env node

import { Command } from 'commander';
import { join } from 'path';
import { loadJsonFileSync } from 'load-json-file';
import clipboardy from 'clipboardy';

import '@jswork/next-param';

const __dirname = new URL('../', import.meta.url).pathname;
const pkg = loadJsonFileSync(join(__dirname, 'package.json'));
const program = new Command();

program.version(pkg.version);
program.option('-v, --verbose', 'verbose output').parse(process.argv);

/**
 * @help: dic -h
 * @description: dic -v
 */

class CliApp {
  constructor() {
    this.args = program.args;
    this.opts = program.opts();
  }

  log(...args) {
    const { verbose } = this.opts;
    if (verbose) console.log('🚚', ...args);
  }

  async queryIp(domain) {
    // https://site.ip138.com/domain/read.do?domain=github.com&time=1626958087
    const params = { domain, time: Date.now() };
    const url = nx.param(params, 'https://site.ip138.com/domain/read.do');
    const headers = { 'Content-Type': 'application/json' };
    const res = await fetch(url, { headers }).then((res) => res.json());
    return res.data?.map((item) => item.ip) || [];
  }

  async run() {
    const domains = this.args;
    const results = [];

    if (!domains.length) return console.log('🚀 Please input domains!');

    // for of
    for (const domain of domains) {
      const ips = await this.queryIp(domain);
      const ip = ips[0];
      const isInvalid = ip === '0.0.0.0';
      if (ips.length) {
        if (!isInvalid) results.push({ domain, ip });
      }
    }

    const hosts = results.map((item) => `${item.ip}\t${item.domain}`).join('\n');
    clipboardy.writeSync(hosts);
    console.log(hosts);
    console.log('🚀 hosts copied!');
  }
}

new CliApp().run();
