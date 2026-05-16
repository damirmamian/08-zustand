import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const titleTag = slug[0] === "all" ? "All Notes" : `Notes tagged with "${slug[0]}"`;
    const descriptionTag = slug[0] === "all" ? "Browse all notes in NoteHub." : `Explore notes tagged with "${slug[0]}" in NoteHub.`;

    return {
        title: titleTag,
        description: descriptionTag,
        openGraph: {
            title: titleTag,
            description: descriptionTag,
            url: `https://08-zustand-ruddy-mu.vercel.app/notes/filter/${slug[0]}`,
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
    };
};

const Notes = async ({ params }: Props) => {
    const { slug } = await params;
    const tag = slug[0] === "all" ? undefined : slug[0];

    const queryClient = new QueryClient();

    const nameNote = "";
    const page = 1;

    await queryClient.prefetchQuery({
        queryKey: ['notes', nameNote, page, tag],
        queryFn: () => fetchNotes(nameNote, page, tag),
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NotesClient tag={tag} />
        </HydrationBoundary>
    )
}

export default Notes;