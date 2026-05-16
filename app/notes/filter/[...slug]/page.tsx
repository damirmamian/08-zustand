import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
    params: Promise<{ slug: string[] }>;
}

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