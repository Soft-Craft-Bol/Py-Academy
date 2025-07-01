import PropTypes from 'prop-types';
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

export function VisorFile({ documentos }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <DocViewer
          documents={documentos}
          pluginRenderers={DocViewerRenderers}
          className="h-full"
        />
      </div>
    </div>
  );
}

VisorFile.propTypes = {
  documentos: PropTypes.arrayOf(
    PropTypes.shape({
      uri: PropTypes.string.isRequired,
      fileType: PropTypes.string,
      fileName: PropTypes.string,
    })
  ).isRequired,
};
