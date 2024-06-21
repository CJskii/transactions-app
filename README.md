# Transactions App

## Overview

The Transactions App is a web application built with Next.js and TypeScript. It allows users to search for Ethereum wallet addresses and transaction hashes. The app provides detailed information about the queried addresses and transactions, enhancing the user experience with a clean and professional interface.

**Live Version:** [Transactions App](https://transactions-app-seven.vercel.app/)

## Features

1. **Search for Default Wallet Address and Transaction Hash**
   - Quickly search for a predefined wallet address and transaction hash from the landing page.
2. **Search Functionality for Wallet and Transaction Hash**
   - Enter any Ethereum wallet address or transaction hash to get detailed information.
   - The application determines if the input is a wallet address or transaction hash and displays the relevant data.

## Supported Networks

- **Ethereum**
- **Polygon**

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS for styling and shadcn custom components
- **API**: Etherscan and Polygonscan APIs for fetching blockchain data

## Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [Bun](https://bun.sh/)

### Installation

1. **Clone the repository**:

   ```
   git clone https://github.com/cjskii/transactions-app.git
   cd transactions-app
   ```

2. **install dependencies:**:

   ```
   bun install
   ```

3. **Set up environment variables:**:

   ```
   git clone https://github.com/cjskii/transactions-app.git
   cd transactions-app
   ```

Create a `.env.local` file in the root directory and add the following variables:

```
ETHERSCAN_API_KEY=your_etherscan_api_key
POLYGONSCAN_API_KEY=your_polygonscan_api_key
```

## Running the Application

**Start the development server:**

```
bun dev
```

## Project Structure

`components/`: Contains the React components used throughout the application.
`hooks/:` Custom hooks for fetching data and other reusable logic.
`pages/`: Next.js pages for routing.
`public/`: Static assets.
`styles/`: Global and component-specific styles.
`utils/`: Utility functions and constants.
`constants/`: Contains constant values used across the app.

## License

This project is licensed under the MIT License.

## Acknowledgements

Thanks to Etherscan and Polygonscan for their API services.
