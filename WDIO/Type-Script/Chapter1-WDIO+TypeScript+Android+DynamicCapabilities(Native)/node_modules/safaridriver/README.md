# Safaridriver for Node.js [![CI](https://github.com/webdriverio-community/node-safaridriver/actions/workflows/ci.yml/badge.svg)](https://github.com/webdriverio-community/node-safaridriver/actions/workflows/ci.yml) [![Audit](https://github.com/webdriverio-community/node-safaridriver/actions/workflows/audit.yml/badge.svg)](https://github.com/webdriverio-community/node-safaridriver/actions/workflows/audit.yml)

> A Node.js untility to manage Safaridriver sessions.

The Safaridriver utility is used to launch an HTTP server that implements the [WebDriver](https://w3c.github.io/webdriver/) REST API. When launched, Safaridriver allows for automated testing of web content using the version of Safari that is installed with macOS.

## Install

To install the package, run:

```sh
npm install --save-dev safaridriver
```

## Usage

To start a Safaridriver server, import the package and run:

```js
import safaridriver from 'safaridriver'

await safaridriver.start()

// run some automation...

// then kill instance via:
safaridriver.stop()
```

## Options

### `port`

Specifies the port on which the HTTP server should listen for incoming connections. If the port is already in use or otherwise unavailable, Safaridriver will exit immediately with a non-zero return code.

__Type:__ `number`<br />
__Default:__ `4444`

### `path`

Path to Safaridriver binary.

__Type:__ `string`<br />
__Default:__ `/usr/bin/safaridriver`

### `useTechnologyPreview`

If set to `true`, it will start the Safaridriver for Safari Technology Preview. Make sure you have it installed by installing Safari Technology Preview on Apple's [offical website](https://developer.apple.com/safari/technology-preview/).

__Type:__ `boolean`<br />
__Default:__ `false`

### `enable`

Applies configuration changes so that subsequent WebDriver sessions will run without further authentication. This includes checking "Enable Remote Automation" in Safari's `Develop` menu. The user must authenticate via password for the changes to be applied.

When this option is specified, safaridriver exits immediately without starting up the REST API service. If the changes were successful or already applied, safaridriver exits 0; otherwise, safaridriver exits >0 and prints an error message to stderr.

__Type:__ `boolean`<br />
__Default:__ `false`

### `diagnose`

Enables diagnostic logging for all sessions hosted by this safaridriver instance.

__Type:__ `boolean`<br />
__Default:__ `false`

----

For more information on WebdriverIO see the [homepage](http://webdriver.io).
