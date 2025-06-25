import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

export function VisorFile(){
    const archivos = [
        {
            uri: "https://drive.google.com/file/d/1jlPabJRvTLzL4xK-KA_uH0oaV_aytyDn/view?usp=drive_link",
            fileType: "pdf",
            fileName: "ejemplo.pdf"
        },
    ]
    return (
        <div>
            <h1>Material</h1>
            <DocViewer documents={archivos} pluginRenderers={DocViewerRenderers}/>
        </div>
    );
}