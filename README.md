# log-mess

Enhanced `console.log` with tags, persistence, and configuration

[![npm version](https://badge.fury.io/js/log-mess.svg)](https://www.npmjs.com/package/log-mess)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A powerful logging utility that extends `console.log` with tagging, persistence, styling, and flexible configuration options. Perfect for debugging complex applications where you need organized, filterable, and persistent logging.

> **Note:** `log-mess` targets web environments (browsers and web workers). It relies on `localStorage`, `navigator`, and a global `self`/`window` for persistence, and is not intended for plain Node.js usage.

## Features

- 🏷️ **Tagged Logging** - Organize logs with custom tags
- 🎨 **Styled Output** - Colorful console output with custom styling
- 💾 **Persistent Storage** - Messages stored in browser storage for later inspection
- ⚙️ **Flexible Configuration** - Enable/disable tags globally or via localStorage
- 🔄 **Message Management** - Update or remove logged messages after creation
- 🌐 **Browser Compatible** - Works across modern browsers with IE fallback
- 📦 **TypeScript Support** - Full TypeScript definitions included

## Installation

```bash
npm install log-mess
```

## Quick Start

```javascript
import { logMessage, lm } from "log-mess";

// Basic logging
logMessage("DEBUG", "Hello world!");
lm("INFO", "Short alias works too");

// Styled logging
logMessage({ tag: "ERROR", bg: "red", fg: "white" }, "Something went wrong!");

// Get message controls
const msg = logMessage("STATUS", "Processing...");
msg.update("Processing complete!");
msg.remove(); // Remove from storage
```

## API Reference

### `logMessage(tag, ...values)`

Log a message with a tag.

```javascript
logMessage("DEBUG", "Debug info", { data: "example" });
```

### `logMessage(meta, ...values)`

Log a message with metadata configuration.

```javascript
logMessage(
    {
        tag: "ERROR",
        bg: "red", // Background color
        fg: "white", // Foreground color
        silent: false, // Skip console output if true
    },
    "Error message"
);
```

### Return Value

Both forms return an object with methods to manage the logged message:

```javascript
const msg = logMessage("INFO", "Hello");

// Update the message content
msg.update("Hello, updated!");

// Remove the message from storage
msg.remove();
```

## Configuration

### Global Configuration

```javascript
import { LogConfig } from "log-mess";

// Disable specific tags
LogConfig.disableTags(["DEBUG", "VERBOSE"]);

// Enable specific tags (overrides disabled)
LogConfig.enableTags(["ERROR", "WARN"]);

// Disable message persistence
LogConfig.disableVariable();
```

### Browser Storage Configuration

You can also control logging via localStorage:

```javascript
// Disable tags via localStorage
localStorage.setItem("log-mess-disabled", "DEBUG,VERBOSE");

// Enable tags via localStorage (takes precedence)
localStorage.setItem("log-mess-enabled", "ERROR,WARN");

// Disable message storage
localStorage.setItem("log-mess-variable-disabled", "true");
```

### Configuration Priority

The configuration system follows this priority order:

1. **localStorage enabled tags** (highest priority)
2. **localStorage disabled tags**
3. **Global config enabled tags**
4. **Global config disabled tags**
5. **Silent flag** (lowest priority)

## Examples

### Basic Usage

```javascript
import { logMessage } from "log-mess";

// Simple tagged logging
logMessage("API", "Fetching user data...");
logMessage("DB", "Query executed successfully");
logMessage(undefined, "Untagged message");
```

### Styled Logging

```javascript
// Error styling
logMessage({ tag: "ERROR", bg: "red", fg: "white" }, "Critical error occurred!");

// Success styling
logMessage({ tag: "SUCCESS", bg: "green", fg: "white" }, "Operation completed successfully");

// Warning styling
logMessage({ tag: "WARN", bg: "orange", fg: "black" }, "This is a warning");
```

### Message Management

```javascript
// Create a status message
const statusMsg = logMessage("STATUS", "Initializing...");

// Update it as work progresses
setTimeout(() => {
    statusMsg.update("Loading configuration...");
}, 1000);

setTimeout(() => {
    statusMsg.update("Ready!");
}, 2000);

// Remove it when no longer needed
setTimeout(() => {
    statusMsg.remove();
}, 5000);
```

### Conditional Logging

```javascript
import { LogConfig } from "log-mess";

// Only show errors and warnings in production
if (process.env.NODE_ENV === "production") {
    LogConfig.disableTags(["DEBUG", "VERBOSE", "INFO"]);
    LogConfig.enableTags(["ERROR", "WARN"]);
}

// These will be filtered based on configuration
logMessage("DEBUG", "This might not show in production");
logMessage("ERROR", "This will always show when enabled");
```

### Silent Logging

```javascript
// Log to storage but not to console
logMessage({ tag: "METRICS", silent: true }, "User clicked button", { timestamp: Date.now() });
```

## Browser Compatibility

- **Modern Browsers**: Full styling support with CSS console formatting
- **Internet Explorer**: Fallback to simple `[TAG]` format
- **All Browsers**: Core logging and persistence functionality

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build
```

## License

[MIT](LICENSE) © [Emestie](https://github.com/Emestie)
