# @yamud/carddav

The protocol layer of the **Vion** suite.
This client handles the communication with CardDAV (and later CalDAV) servers.

> ⚠️ **Note:** This package is currently in early alpha.

## Features

* 📡 **WebDAV/CardDAV Protocol:** Handles `PROPFIND`, `REPORT` and Sync-Collections.
* 🔗 **Vion Integration:** Uses `@yamud/vobject` for parsing server responses.
* 🔒 **Authentication:** Basic & Bearer Auth support.
* 🚀 **Modern:** Fetch API based (Node 20+ native).

## Installation

```bash
npm install @yamud/carddav
```

## Usage (Preview)

```typescript
import { CardDavClient } from '@yamud/carddav';

const client = new CardDavClient({
  url: '[https://dav.example.com](https://dav.example.com)',
  auth: { user: '...', pass: '...' }
});

const contacts = await client.addressBook.fetchAll();
```

## License

MIT © Marco Grießhammer
