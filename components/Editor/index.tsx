import {
  Editor as DraftEditor,
  EditorCommand,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useRef, useState } from "react";
import BlockStyleControles from "./BlockStyleControles";
import DecorationButton from "./DecorationButton";

const Editor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = useRef<null | DraftEditor>(null);

  const focusEditor = () => {
    editor.current && editor.current.focus();
  };

  const handleBold = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const handleUnderline = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"));
  };

  const handleItalic = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
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
    <div className="m-4">
      <div className="mb-1 ml-20 pr-4 flex items-center">
        <div className="ml-auto flex items-center space-x-5">
          <BlockStyleControles
            editorState={editorState}
            setEditorState={setEditorState}
          />
          <DecorationButton handleFunction={handleBold} description="Bold">
            B
          </DecorationButton>
          <DecorationButton handleFunction={handleItalic} description="Italic">
            I
          </DecorationButton>
          <DecorationButton
            handleFunction={handleUnderline}
            description="Underline"
          >
            U
          </DecorationButton>
        </div>
      </div>
      <div
        className="shadow-sm border border-gray-300 rounded-md sm:text-sm overflow-scroll h-[500px] p-3"
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
    </div>
  );
};

export default Editor;
