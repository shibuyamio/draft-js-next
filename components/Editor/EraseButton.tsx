import { TrashIcon } from "@heroicons/react/outline";
import { ContentState, EditorState } from "draft-js";
import { useContext } from "react";
import DecorationButton from "./DecorationButton";
import EditorContext from "./EditorContext";
import { removeLocalStorageItem } from "./utils";

const EraseButton = () => {
  const { id, editorState, setEditorState } = useContext(EditorContext);

  // 空の文字列を現在のテキストとして設定
  const handleClick = () => {
    const newState = EditorState.push(
      editorState,
      ContentState.createFromText(""),
      "change-block-data"
    );

    setEditorState(newState);
    removeLocalStorageItem(id);
  };

  return (
    <div className="pl-3">
      <DecorationButton handleFunction={handleClick} description="消去">
        <TrashIcon
          className="text-gray-500 flex-shrink-0 h-5 w-5 sm:-ml-1"
          aria-hidden="true"
        />
      </DecorationButton>
    </div>
  );
};

export default EraseButton;
