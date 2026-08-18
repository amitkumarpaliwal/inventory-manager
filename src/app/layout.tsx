import "../styles/globals.css"; 

import type { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";
import Providers from './providers';
import Header from '@/shared/header';

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            closeOnClick
            draggable
            hideProgressBar ={true}
          />
      </Providers>
      </body>
    </html>
  );
}