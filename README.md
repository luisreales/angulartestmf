# Products CRUD Application

A modern Angular application for managing products with a beautiful UI built using Angular 20, Tailwind CSS, and Angular Signals.

## Features

- 📦 **Complete CRUD Operations**: Create, Read, Update, and Delete products
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔄 **Real-time Updates**: Automatic UI updates with Angular Signals
- 🗑️ **Delete Confirmation**: Modal confirmation for safe product deletion
- 📱 **Responsive Design**: Works perfectly on desktop and mobile devices
- 🔄 **Data Persistence**: JSON Server backend for data storage
- 🎯 **Icon-based Actions**: Elegant edit and delete icons
- 📊 **Product Management**: Manage product inventory with categories, prices, and descriptions

## Quick Start

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone or download** this repository to your local machine

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the JSON Server backend** (in a separate terminal):
   ```bash
   npx json-server Backend/Model/db.json --port 3000
   ```

4. **Start the Angular development server**:
   ```bash
   npm start
   ```

5. **Open your browser** and navigate to `http://localhost:4200`

That's it! 🎉 Your Products CRUD application is now running locally.

## Usage

### Managing Products

- **View Products**: The app starts by showing all available products in a clean table
- **Add Product**: Click "New Product" to create a new product
- **Edit Product**: Click the edit icon (pencil) next to any product to modify it
- **Delete Product**: Click the delete icon (trash) to remove a product (with confirmation)
- **Reload Data**: If no products exist, use the "Reload Data" button to restore sample products

### Product Fields

Each product includes:
- **Name**: Product name
- **SKU**: Stock Keeping Unit identifier
- **Price**: Product price (supports decimals)
- **Category**: Product category
- **Description**: Detailed product description

## Project Structure

```
src/
├── app/
│   ├── child-one/          # Product form component
│   ├── child-two/          # Products list component
│   ├── child-three/        # Action buttons component
│   ├── parent/             # Main container component
│   ├── services/
│   │   └── api.ts          # API service for backend communication
│   └── shared/
│       └── product.ts      # Product interfaces
├── Backend/
│   └── Model/
│       ├── db.json         # JSON Server database
│       └── db_backup.json  # Backup data
└── styles.css              # Global styles
```

## Technologies Used

- **Angular 20**: Modern web framework
- **Angular Signals**: Reactive state management
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript
- **JSON Server**: Mock REST API
- **RxJS**: Reactive programming

## Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run unit tests
- `npm run lint` - Run ESLint

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
