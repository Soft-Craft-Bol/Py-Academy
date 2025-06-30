import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css" ;

export function VisorFile(){
    const archivos = [
        {
            uri: "/aprendizaje.pdf",
            fileType: "pdf",
            fileName: "ejemplo.pdf"
        },
        {
            uri: "/progradb.png",
            fileType: "png",
            fileName: "ejemplo.png"
        },
        
    ]
    return (
        <div className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto">
                <DocViewer
                    documents={archivos}
                    pluginRenderers={DocViewerRenderers}
                    className="h-full"
                />
            </div>
        </div>
    );
}