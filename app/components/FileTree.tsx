import { Folder, File, ChevronDown, ChevronRight } from "lucide-react";

export default function FileTree() {
    const tree = [
        {
            name: "mx-project", type: "folder", children: [
                { name: "wasm", type: "folder", children: [{ name: "Cargo.toml", type: "file" }, { name: "src/lib.rs", type: "file" }] },
                { name: "meta", type: "folder", children: [{ name: "Cargo.toml", type: "file" }] },
                { name: "src", type: "folder", children: [{ name: "lib.rs", type: "file" }] },
                { name: "Cargo.toml", type: "file" },
                { name: "multiversx.json", type: "file" },
            ]
        }
    ];

    const renderItem = (item: any, depth = 0) => (
        <div key={item.name} style={{ marginLeft: depth * 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.7rem", padding: "2px 0", opacity: 0.8 }}>
                {item.type === "folder" ? <ChevronDown size={12} /> : null}
                {item.type === "folder" ? <Folder size={12} fill="#0ea5e9" color="#0ea5e9" /> : <File size={12} />}
                {item.name}
            </div>
            {item.children?.map((child: any) => renderItem(child, depth + 1))}
        </div>
    );

    return (
        <div style={{ padding: "12px", borderTop: "1px solid var(--glass-border)", background: "rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: "0.6rem", fontWeight: "800", opacity: 0.4, marginBottom: "8px", textTransform: "uppercase" }}>Project Structure (mxpy)</div>
            {tree.map(item => renderItem(item))}
        </div>
    );
}
