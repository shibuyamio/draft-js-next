import { Editor as DraftEditor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import { useState } from "react";

const Editor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <DraftEditor
      editorState={editorState}
      onChange={setEditorState}
      placeholder="Tell a story..."
    />
  );
};

export default Editor;
