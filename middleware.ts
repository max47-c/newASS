  import authConfig from "./auth.config";
  import NextAuth from "next-auth";
  import { 
    apiAuthPrefix, 
    authRoutes, 
    DEFAULT_REDIRECT, 
    publicRoutes } from "./routes";
  import {currentUser} from "@/lib/auth";

 const {auth} = NextAuth(authConfig)
 const user = currentUser
 export default auth((req) =>{
    const {nextUrl} = req
    const isLoggedIn = !!req.auth
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname)
    const isApiAuthPrefix = nextUrl.pathname.startsWith(apiAuthPrefix)
    if (isApiAuthPrefix) {
        return
    }
    if(isAuthRoutes){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_REDIRECT,nextUrl))
          }return
    }
    if(!isLoggedIn && !isPublicRoutes){
        
            return Response.redirect(new URL("/sign-in",nextUrl))
    
    }
 })


 export const config = {
    matcher: [
      // Skip Next.js internals and all static files, unless found in search params
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      // Always run for API routes
      '/(api|trpc)(.*)',
    ],
  }