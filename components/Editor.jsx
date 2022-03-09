import { EditorState } from "draft-js";
import "draft-js/dist/Draft.css";
import dynamic from "next/dynamic";
import { useState } from "react";

// Draft.jsはSSRに対応していないのでSSRでレンダリングしないようにする
const DraftEditor = dynamic(
  () => import("draft-js").then((mod) => mod.Editor),
  { ssr: false }
);
const Editor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return <DraftEditor editorState={editorState} onChange={setEditorState} />;
};

export default Editor;
