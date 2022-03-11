import {
  Editor as DraftEditor,
  EditorCommand,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRef, useState } from "react";
import blockStyleFn from "./blockStyleClasses";
import BlockStyleControles from "./BlockStyleControles";
import InlineStyleButtons from "./InlineStyleButtons";

const Editor = () => {
  const [editorState, setEditorState] = useState<EditorState>(() =>
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
    <div className="m-4 max-w-xl">
      <div className="mb-1 pr-4 flex items-center">
        <div className="ml-auto flex items-center space-x-5">
          <BlockStyleControles
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <InlineStyleButtons
            editorState={editorState}
            setEditorState={setEditorState}
          />
        </div>
      </div>
      <div
        className="shadow-sm border border-gray-300 rounded-md sm:text-sm overflow-scroll h-[500px] p-3 prose prose-stone"
        onClick={focusEditor}
      >
        <DraftEditor
          ref={editor}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          placeholder="Tell a story..."
          blockStyleFn={blockStyleFn}
        />
      </div>
    </div>
  );
};

export default Editor;
