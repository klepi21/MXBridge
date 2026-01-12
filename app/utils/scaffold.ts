import JSZip from "jszip";

export async function generateMxProject(rustCode: string) {
    const zip = new JSZip();

    // Project Structure
    zip.file("multiversx.json", JSON.stringify({
        name: "mx-sc-project",
        version: "0.0.1"
    }, null, 2));

    const scDir = zip.folder("mx-sc-project");
    if (scDir) {
        scDir.file("Cargo.toml", `[package]
name = "mx-sc-project"
version = "0.0.1"
authors = ["MX Dev Bridge"]
edition = "2021"

[dependencies.multiversx-sc]
version = "0.45.0"

[lib]
path = "src/lib.rs"
`);

        const srcDir = scDir.folder("src");
        if (srcDir) {
            srcDir.file("lib.rs", rustCode || "// Translated code here");
        }

        const wasmDir = scDir.folder("wasm");
        if (wasmDir) {
            wasmDir.file("Cargo.toml", `[package]
name = "mx-sc-project-wasm"
version = "0.0.1"
edition = "2021"

[dependencies.mx-sc-project]
path = ".."

[lib]
path = "src/lib.rs"
`);
            const wasmSrc = wasmDir.folder("src");
            if (wasmSrc) {
                wasmSrc.file("lib.rs", `multiversx_sc_wasm_adapter::endpoints! {
    mx_sc_project
    (
        init
    )
}`);
            }
        }

        const metaDir = scDir.folder("meta");
        if (metaDir) {
            metaDir.file("Cargo.toml", `[package]
name = "mx-sc-project-meta"
version = "0.0.1"
edition = "2021"

[dependencies.multiversx-sc-meta]
version = "0.45.0"

[dependencies.mx-sc-project]
path = ".."
`);
        }
    }

    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mx-project.zip";
    a.click();
}
