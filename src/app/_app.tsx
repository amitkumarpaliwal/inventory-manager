import type { AppProps } from "next/app"; 
import { SessionProvider } from "next-auth/react"; 
import "../styles/globals.css"; 
import { useEffect } from "react";

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) { 
	useEffect(() => {
		console.log('App Mounted');
	}, [])
	return (
		<SessionProvider session={session}>
			<Component {...pageProps} />
		</SessionProvider>);
}