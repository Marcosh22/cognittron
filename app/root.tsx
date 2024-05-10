import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import styles  from "./globals.css?url";
import { initializeData } from "./.server/actions";
import Container from "./components/Container/Container";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles  },
];

export const loader = async () => {
  await initializeData();
  return null;
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-generalSans text-base text-secondary-350 bg-secondary-150 p-0">
        <main className="h-screen pt-20">
          <Container>{children}</Container>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
