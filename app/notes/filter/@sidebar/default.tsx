import css from "./SidebarNote.module.css";
import Link from "next/link";

const SidebarNotes = () => {
    const tagArr: string[] = ["Meeting", "Personal", "Shopping", "Todo", "Work"];
    return (
        <ul className={css.menuList}>
            {/* список тегів */}
            <li className={css.menuItem}>
                <Link href={`/notes/filter/all`} className={css.menuLink}>
                    All notes
                </Link>
            </li>
            {tagArr.map((tag) => {
                return (
                    <li className={css.menuItem} key={tag}>
                        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default SidebarNotes