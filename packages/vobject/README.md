# @yamud/vobject

The core parsing engine of the **Vion** suite.
A modern, strictly typed parser and builder for vCard, vList, and iCalendar formats.

> ⚠️ **Note:** This package is currently in early alpha. APIs might change.

## Features

* ✅ **vCard Support:** Parse and generate `.vcf` files (RFC 6350).
* ✅ **vList Support:** Specialized support for SOGo vLists.
* 📅 **iCalendar Support:** (Coming Soon) Full RFC 5545 support.
* 🔒 **Type-Safe:** Full TypeScript definitions included.
* ⚡ **Zero Dependencies:** Lightweight and fast.

## Installation

```bash
npm install @yamud/vobject
```

## Usage (Preview)

```typescript
import { VCard } from '@yamud/vobject';

// Parsing
const rawData = `BEGIN:VCARD\nVERSION:4.0\nFN:Marco Grießhammer\nEND:VCARD`;
const card = VCard.parse(rawData);

console.log(card.fn); // "Marco Grießhammer"

// Building
const newCard = new VCard();
newCard.fn = "New Contact";
console.log(newCard.toString());
```

## License

MIT © Marco Grießhammer
