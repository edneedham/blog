import Link from "next/link";

export function Header() {
    return (
        <header>
            <h1>Ed Needham's Blog</h1>
            <nav>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/about">About</Link></li>
                    <li><Link href="/contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    )
}