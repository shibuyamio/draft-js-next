import { EditorState } from "draft-js";
import { createContext, Dispatch, SetStateAction } from "react";

type EditorContextProps = {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
};

// ダミーを割り当てる
const EditorContext = createContext<EditorContextProps>({
  editorState: EditorState.createEmpty(),
  setEditorState: () => {},
});

export default EditorContext;
