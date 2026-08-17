import type { ReactNode } from 'react';
import { ToastContainer } from "react-toastify";


interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}
      <ToastContainer
position="top-right"
autoClose={3000}
closeOnClick
draggable
hideProgressBar ={true}
/>
</body>
    </html>
  );
}