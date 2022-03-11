import {
  convertFromRaw,
  convertToRaw,
  Editor as DraftEditor,
  EditorCommand,
  EditorState,
  RichUtils,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useCallback, useRef, useState } from "react";
import blockStyleFn from "./blockStyleClasses";
import BlockStyleControles from "./BlockStyleControles";
import EditorContext from "./EditorContext";
import EraseButton from "./EraseButton";
import InlineStyleButtons from "./InlineStyleButtons";

const saveContent = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  console.log(JSON.stringify(rawContentState));
  window.localStorage.setItem(
    "draftjscontent",
    JSON.stringify(rawContentState)
  );
};

const getInitialContent = () => {
  const content = window.localStorage.getItem("draftjscontent");
  if (content) {
    return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
  }

  return EditorState.createEmpty();
};

const Editor = () => {
  const [editorState, setEditorState] = useState<EditorState>(
    getInitialContent()
  );

  const editor = useRef<null | DraftEditor>(null);

  const focusEditor = useCallback(() => {
    editor.current && editor.current.focus();
  }, []);

  const handleContentChange = (editorState: EditorState) => {
    saveContent(editorState);
    setEditorState(editorState);
  };

  const handleKeyCommand = useCallback(
    (command: EditorCommand, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        setEditorState(newState);
        return "handled";
      }

      return "not-handled";
    },
    []
  );

  return (
    <EditorContext.Provider
      value={{
        editorState: editorState,
        setEditorState: setEditorState,
      }}
    >
      <div className="m-4 max-w-xl">
        <div className="mb-1 pr-4 flex items-center">
          <div className="ml-auto flex items-center space-x-5">
            <BlockStyleControles />
            <InlineStyleButtons />

            <EraseButton />
          </div>
        </div>
        <div
          className="shadow-sm border border-gray-300 rounded-md sm:text-sm overflow-scroll h-[500px] p-3 prose prose-stone"
          onClick={focusEditor}
        >
          <DraftEditor
            ref={editor}
            editorState={editorState}
            onChange={handleContentChange}
            handleKeyCommand={handleKeyCommand}
            placeholder="Tell a story..."
            blockStyleFn={blockStyleFn}
          />
        </div>
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
