import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
} from "@remix-run/react";

import type { LinksFunction } from "@remix-run/node";
import styles from "./globals.css?url";
import Container from "./components/Container/Container";
import Loader from "./components/Loader/Loader";
import { Toaster } from "./components/ui/toaster";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export function Layout({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation();

  return (
    <html lang="pt-BR">
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
        <Toaster />
       <Loader show={navigation.state === "loading" || navigation.state === "submitting"} />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
