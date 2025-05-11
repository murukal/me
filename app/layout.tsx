import "./globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Provided from "@/components/provided";
import { cookies } from "next/headers";
import { stringify } from "@aiszlab/relax/class-name";
import { ApplicationToken } from "@/assets/token";
import { GoogleAnalytics } from "@next/third-parties/google";
import { type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "tutu.me",
  description: "welecome to tutu.me",
};

const Layout = async ({ children }: Props) => {
  const authenticated = (await cookies()).get(
    ApplicationToken.Authenticated
  )?.value;

  return (
    <html lang="zh-cn">
      <head>
        {!!authenticated && (
          <script
            dangerouslySetInnerHTML={{
              __html: `globalThis.window.sessionStorage.setItem('${ApplicationToken.Authenticated}', '${authenticated}')`,
            }}
          />
        )}
      </head>

      <body className={stringify(geist.className)}>
        <Provided>{children}</Provided>
      </body>

      <GoogleAnalytics gaId="G-PSXENQ5JKD" />
    </html>
  );
};

export default Layout;
