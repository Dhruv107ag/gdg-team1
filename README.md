Here’s the same content formatted cleanly as a Markdown (`README.md`) file:

````md
# Project Setup Guide

## 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
````

## 2. Install Dependencies

* If you have **pnpm**:

  ```bash
  pnpm i
  ```
* If you use **npm**:

  ```bash
  npm i
  ```

## 3. Start the Development Server

* For **pnpm**:

  ```bash
  pnpm run dev
  ```
* For **npm**:

  ```bash
  npm run dev
  ```

## 4. Load the Extension in Chrome

1. Open Chrome and navigate to:

   ```
   chrome://extensions
   ```
2. Enable **Developer Mode** (top-right corner).
3. Click **Load unpacked** (top-left corner).
4. Select the `chrome-mv3-dev` folder from your project directory.

   Example:

   ```
   /home/prashantsingh/prashant_workspace/code/chrome-mv3-dev
   ```

## 5. Open a New Tab

The extension should now be active and ready to use.
