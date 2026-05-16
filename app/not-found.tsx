import css from "./Home.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "404 - Not Found",
    description: "Sorry, the page you are looking for does not exist.",
    openGraph: {
        title: "404 - Not Found",
        description: "Sorry, the page you are looking for does not exist.",
        url: "https://08-zustand-ruddy-mu.vercel.app/not-found",
        siteName: "NoteHub",
        images: [
            {
                url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
                width: 1200,
                height: 630,
                alt: "NoteHub Open Graph Image",
            }
        ],
    },
}
const NotFound = () => {
    return (
        <>
            <h1 className={css.title}>404 - Page not found</h1>
            <p className={css.description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
};

export default NotFound;