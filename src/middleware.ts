import  type  { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest,) {
    const payloadToken = request.cookies.get('payload-token');  
    if (!payloadToken && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if(request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/home', request.url));
    }

    if(request.nextUrl.pathname.startsWith('/api')) {
         return NextResponse.next();
    }

    return NextResponse.next();

    
}

export const config = {
    matcher: [
        '/',
        '/home',
        '/todo-create',
        '/todos/:path*',
        '/api/:path*'
    ]

};