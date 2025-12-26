# 🍛 NAMASTE Ristorante

A modern, playful website for **NAMASTE Ristorante** - authentic Indian cuisine in Turin, Italy. Built with Next.js 14, featuring a unique hand-drawn indie aesthetic.

## ✨ Features

- **Playful Hand-Drawn Design** - Organic sketchy borders, blob shapes, and micro-animations
- **Interactive FluidReveal Hero** - Canvas-based image reveal with inertia and trail effects
- **Complete Menu System** - 12 categories, 52 items with real-time cart management
- **Responsive Checkout** - Full order flow with email notifications
- **100% Halal** certified cuisine

## 🎨 Design Aesthetic

The website features a unique cartoonist/indie artist aesthetic:
- Sketchy irregular borders with hand-drawn feel
- Organic blob shapes as decorative elements
- Playful animations (wiggle, float, bounce)
- Warm color palette: saffron, turmeric, cardamom, cream
- Handwritten accent fonts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Email**: Resend API
- **Notifications**: Telegram Bot API

## 📁 Project Structure

```
namaste-ristorante/
├── src/
│   ├── app/                    # Next.js pages
│   │   ├── page.tsx           # Home with FluidReveal hero
│   │   ├── menu/              # Menu page
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   ├── order-confirmation/# Order success
│   │   └── api/               # API routes
│   ├── components/
│   │   ├── ui/                # FluidReveal, Button, Input
│   │   ├── menu/              # MenuItem, MenuGrid, CategoryFilter
│   │   ├── cart/              # CartItem, CartSummary
│   │   ├── checkout/          # CheckoutForm
│   │   └── layout/            # Header, Footer
│   ├── contexts/              # CartContext, ThemeContext
│   ├── data/                  # Menu data (12 categories)
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
└── tailwind.config.ts         # Custom design tokens
```

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/krishanu8219/namaste-ristorante.git
   cd namaste-ristorante
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in:
   - `RESEND_API_KEY` - For order confirmation emails
   - `RESTAURANT_EMAIL` - Email to receive orders
   - `TELEGRAM_BOT_TOKEN` - For Telegram notifications (optional)
   - `TELEGRAM_CHAT_ID` - Telegram chat ID (optional)

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open** [http://localhost:3000](http://localhost:3000)

## 📍 Restaurant Info

**NAMASTE Ristorante**  
Corso Monte Cucco 26 B  
10139 Torino, Italy  
📞 +39 011 796 579  
🕐 Ordini: 18:00 - 22:00

## 📜 Menu Categories

| Category | Items |
|----------|-------|
| Antipasti - Snacks | 4 |
| Griglia - Grill | 4 |
| Pollo | 7 |
| Agnello | 4 |
| Gamberi | 2 |
| Verdure e Legumi | 8 |
| Focacce e Pane | 6 |
| Riso - Biryani | 3 |
| Dolci | 4 |
| Bevande | 4 |
| Birre | 5 |
| Vini | 6 |

## 📄 License

MIT License - see LICENSE file for details.

---

Made with 💛 and lots of spices! 🌶️