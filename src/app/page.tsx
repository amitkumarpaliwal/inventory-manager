// import { useEffect } from "react"; 
// import { useRouter } from "next/router"; 

// export default function Home() { 
//     const router = useRouter(); 
//     useEffect(() => { 
//         router.replace("/login") 
//     }, [router]); 
    
//     return null; 
// }

import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}