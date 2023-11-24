'use server'
import { NextResponse } from "next/server";
import { validateToken } from "./app/functions/validateToken";

export const middleware = (request) => {
    
    const urlAlter = new URL('/pages/alter', request.url);
    const token = request.cookies.get('token')?.value;
    const urlLogin = new URL('/', request.url);
    const urlDash = new URL('/pages/dashboard', request.url);
    const isTokenValidated = validateToken(token);
    const urlRegister = new URL('/pages/register', request.url);

    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/dashboard') {
            return NextResponse.redirect(urlLogin);
        }
    }
    if (isTokenValidated) {
        if (request.nextUrl.pathname === '/') {
            return NextResponse.redirect(urlDash);
        }
    }
    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/alter') {
            return NextResponse.redirect(urlLogin);
        }
    }
    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/register') {
            return NextResponse.redirect(urlLogin);
        }
    }
    NextResponse.next();
};
export const config = {
    matcher: ['/', '/pages/dashboard', '/pages/alter', '/pages/register']
};

