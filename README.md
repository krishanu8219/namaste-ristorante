# Apna Punjab Pizza Kebap

Welcome to the **Apna Punjab Pizza Kebap** full-stack web application! This project is built using **Next.js 14**, **TypeScript**, and **Tailwind CSS**. It integrates **Supabase** for order persistence and the **WhatsApp Cloud API** for order notifications.

## Project Structure

The project is organized as follows:

```
apna-punjab-pizza-kebap
├── src
│   ├── app
│   │   ├── layout.tsx          # Main layout including header and footer
│   │   ├── page.tsx            # Main landing page
│   │   ├── menu                 # Menu related pages
│   │   ├── cart                 # Cart related pages
│   │   ├── checkout             # Checkout related pages
│   │   ├── orders               # Admin orders page
│   │   ├── api                  # API routes for orders and notifications
│   │   └── globals.css          # Global styles
│   ├── components               # Reusable components
│   ├── lib                      # Library files for Supabase and WhatsApp
│   ├── hooks                    # Custom hooks for state management
│   ├── types                    # TypeScript types
│   ├── data                     # Menu data
│   └── contexts                 # Context API for cart management
├── public                       # Public assets
├── supabase                     # Supabase configuration and migrations
├── .env.local.example           # Example environment variables
├── .env.local                   # Actual environment variables
├── .gitignore                   # Git ignore file
├── next.config.js               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
├── package.json                 # Project dependencies and scripts
└── README.md                    # Project documentation
```

## Features

- **Menu Display**: View the restaurant's menu with categories and items.
- **Cart Functionality**: Add items to the cart, view cart contents, and modify selections.
- **Checkout Process**: Enter user details and confirm orders.
- **Order Management**: Admin page to view recent orders from Supabase.
- **Notifications**: Receive order notifications via WhatsApp.

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd apna-punjab-pizza-kebap
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Set up environment variables**:
   - Copy `.env.local.example` to `.env.local` and fill in the required values.

4. **Run the development server**:
   ```
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.