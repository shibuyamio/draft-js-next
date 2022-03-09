import {
  Editor as DraftEditor,
  EditorCommand,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRef, useState } from "react";

const Editor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef<null | DraftEditor>(null);

  const focusEditor = () => {
    editor.current && editor.current.focus();
  };

  const handleKeyCommand = (
    command: EditorCommand,
    editorState: EditorState
  ) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  return (
    <div
      className="shadow-sm border border-gray-300 rounded-md sm:text-sm m-5 overflow-scroll h-[500px] p-3"
      onClick={focusEditor}
    >
      <DraftEditor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        placeholder="Tell a story..."
      />
    </div>
  );
};

export default Editor;
