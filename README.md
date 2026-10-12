# 🛒 বাজার দর — Bazar Dor

A responsive Bengali market-price application built with Next.js and TypeScript. Explore daily product prices, compare price changes, browse categories, and view market-level prices after signing in.

## 🔗 Project Links

- **Live Website:** ADD_YOUR_DEPLOYED_WEBSITE_URL
- **GitHub Repository:** ADD_YOUR_GITHUB_REPOSITORY_URL

## ✨ Features

- Bengali product names, prices, percentage changes, and date display.
- Responsive navbar with category navigation and active-link highlighting.
- Infinite scrolling ticker displaying product prices and changes.
- Hero section with a button that scrolls to all products.
- Top six products with price increases and decreases.
- Responsive product cards with emojis, unit labels, prices, and change badges.
- Category filtering with ascending and descending price sorting.
- Protected product details with minimum, maximum, and average market prices.
- Email/password, Google, and GitHub authentication through Better Auth.
- Protected profile page with a separate name-update form.
- Toast notifications for authentication, validation, and profile updates.
- Loading skeletons, error handling, and friendly 404 pages.
- MongoDB persistence for authentication data.

> Authentication requires a working MongoDB connection. Google and GitHub login require valid OAuth credentials and correctly configured callback URLs.

## 🛠️ Technologies

| Technology | Purpose |
| --- | --- |
| Next.js App Router | Routing, server rendering, and API handlers |
| TypeScript | Type-safe application development |
| React | UI components and client interactions |
| Tailwind CSS | Responsive styling |
| DaisyUI | UI components and utilities |
| Better Auth | Authentication and session management |
| MongoDB | Authentication data storage |
| Zod | Product API response validation |
| React Hot Toast | Success and error notifications |
| React Icons | Social login icons |

## 🚀 Installation and Setup

### 1. Clone the repository

Replace the placeholder with your repository URL:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL bazar-dor
cd bazar-dor
```

### 2. Install dependencies

Install a Node.js version compatible with the project's Next.js version, then run:

```bash
npm install
```

The project must declare `zod` and `server-only` as dependencies. If they are missing:

```bash
npm install zod server-only
```

### 3. Configure environment variables

Create a `.env.local` file in the project root:

```env
BETTER_AUTH_SECRET=REPLACE_WITH_A_LONG_RANDOM_SECRET
BETTER_AUTH_URL=http://localhost:3000

MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority&appName=bazar_dor
MONGODB_DB=bazar_dor

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET

GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET

PRODUCT_API_URL=https://openapi.programming-hero.com/api/bazardor
PRODUCT_API_FALLBACK_URL=https://api.abcz.workers.dev/api/bazardor
```

Use the connection string supplied by your own MongoDB Atlas cluster and replace all placeholders.

Generate an authentication secret:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

Keep environment files out of Git. Restart the server after changing environment variables.

If the same variables exist in `.env`, keep them consistent with `.env.local`.

### 4. Configure MongoDB Atlas

1. Create or select an active cluster.
2. Create a database user with permission to read and write the application database.
3. Configure Network Access for the machine or deployment environment running the server.
4. Open **Connect → Drivers** and copy the connection string.
5. Set `MONGODB_URI` and `MONGODB_DB` in your environment file.

### 5. Configure Google login

Create a Google OAuth client with application type **Web Application**.

Configure:

- **Authorized JavaScript origin:**

  ```text
  http://localhost:3000
  ```

- **Authorized redirect URI:**

  ```text
  http://localhost:3000/api/auth/callback/google
  ```

Copy the client ID and client secret into your environment file.

### 6. Configure GitHub login

Create a GitHub OAuth App.

Configure:

- **Homepage URL:**

  ```text
  http://localhost:3000
  ```

- **Authorization callback URL:**

  ```text
  http://localhost:3000/api/auth/callback/github
  ```

Copy the client ID and client secret into your environment file.

### 7. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## 📜 Available Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Run ESLint |
| `npm run build` | Create a production build |
| `npx tsc --noEmit` | Check TypeScript types |
| `npm run start` | Start the production server |

Run `npm run build` before `npm run start`.

## 📁 Project Structure

```text
public/
  image/
    logo-icon.png
    bazar-hero.png

src/
  app/
    api/
      auth/
        [...all]/
          route.ts

    category/
      [slug]/
        loading.tsx
        page.tsx

    product/
      [slug]/
        loading.tsx
        page.tsx

    profile/
      page.tsx
      update/
        page.tsx

    signin/
      page.tsx

    signup/
      page.tsx

    error.tsx
    globals.css
    layout.tsx
    loading.tsx
    not-found.tsx
    page.tsx

  components/
    AuthForm.tsx
    CategoryProducts.tsx
    ChangeBadge.tsx
    Feedback.tsx
    Footer.tsx
    Header.tsx
    Hero.tsx
    Navbar.tsx
    ProductCard.tsx
    ProductSkeleton.tsx
    ProfileUpdateForm.tsx
    Providers.tsx
    ReservedImage.tsx
    SignOutButton.tsx
    Ticker.tsx

  lib/
    api.ts
    auth-client.ts
    auth.ts
    categories.ts
    format.ts
    schemas.ts
    session.ts
```

## 🧭 Application Routes

| Route | Access | Description |
| --- | --- | --- |
| `/` | Public | Hero, price changes, and all products |
| `/category/[slug]` | Public | Category products and price sorting |
| `/product/[slug]` | Signed-in users | Product summary and market prices |
| `/signin` | Public | Email/password and social sign-in |
| `/signup` | Public | Registration and social sign-in |
| `/profile` | Signed-in users | Account information |
| `/profile/update` | Signed-in users | Update the account name |
| `/api/auth/[...all]` | Auth handler | Better Auth endpoints |

Unknown routes and invalid product or category slugs display a friendly not-found message.

## 🌐 Product API

The application fetches products on the server from:

```text
https://openapi.programming-hero.com/api/bazardor/products
```

The configured fallback is:

```text
https://api.abcz.workers.dev/api/bazardor/products
```

Set the API environment variables to the **base URL without `/products`**. The API helper appends the endpoint.

The API integration includes:

- Server-side fetching.
- Response validation with Zod.
- A 60-second revalidation interval.
- Request timeouts.
- Fallback API support.
- Error handling when both sources fail.

Product data comes from the external API. MongoDB stores authentication data.

## 📊 Price Calculations

- **Top risers and fallers:** Products are grouped by change direction, sorted by the magnitude of their percentage change, and limited to six per section.
- **Minimum price:** The lowest minimum price among the listed markets.
- **Maximum price:** The highest maximum price among the listed markets.
- **Average price:** The arithmetic mean of each market's midpoint:

  ```text
  Market midpoint = (minimum + maximum) / 2
  Average price = sum of market midpoints / number of markets
  ```

- **Category sorting:** Numeric comparison of today's prices.
- **Change colors:** Green for increases, red for decreases, and gray for unchanged prices.

Displayed prices are indicative and may differ between markets.

## 🔐 Authentication Flow

### Email and password

1. Users register with their name, email, and password.
2. Successful registration redirects to the sign-in page.
3. Successful sign-in redirects to the home page.
4. Signed-in users can access product details and their profile.
5. Users can update their name through `/profile/update`.
6. Signing out returns the user to the home page.

### Social authentication

Google and GitHub login use Better Auth's OAuth integration. Provider credentials and callback URLs must match the environment where the application runs.

## 🖼️ Logo and Banner

Replace these files with your own images:

- **Navbar logo:** `public/image/logo-icon.png`
- **Hero banner:** `public/image/bazar-hero.png`

The components reserve space for these images and display a fallback if loading fails.

## ☁️ Deployment to Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add the environment variables in the project settings.
4. Set `BETTER_AUTH_URL` to the deployed HTTPS website URL.
5. Configure MongoDB Atlas access for the deployment environment.
6. Update the OAuth callback URLs:

   ```text
   https://YOUR_DOMAIN/api/auth/callback/google
   http://localhost:3000/api/auth/callback/github
   ```

7. Update Google's authorized JavaScript origin to the deployed website URL.
8. Deploy or redeploy after configuration changes.
9. Test registration, sign-in, social login, profile updates, and sign-out.
10. Refresh product and profile routes to verify protected-route behavior.
11. Replace the Live Website and GitHub Repository placeholders at the top of this README.

## 🔧 Troubleshooting

### MongoDB rejects an empty appName

If the connection string contains:

```text
appName=
```

Change it to:

```text
appName=bazar_dor
```

Alternatively, remove that option.

### Signup or social login fails

Inspect the failed request in the browser's **Network → Response** tab and check the server terminal.

Confirm:

- MongoDB connectivity and database permissions.
- Authentication environment variables.
- Google and GitHub OAuth credentials.
- Matching callback URLs.
- The correct `BETTER_AUTH_URL`.

### MongoDB connection times out

Check cluster availability, DNS/network connectivity, the connection string, and Atlas Network Access.

### Hydration warning mentions Grammarly

Attributes such as these indicate browser-extension changes:

```text
data-new-gr-c-s-check-loaded
data-gr-ext-installed
```

Disable Grammarly for the site and reload to test.

### Products fail to load

Confirm the API base URLs, inspect the server logs, and verify that the response matches the schema in `src/lib/schemas.ts`.