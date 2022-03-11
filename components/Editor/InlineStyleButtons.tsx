import { RichUtils } from "draft-js";
import { memo, useContext } from "react";
import DecorationButton from "./DecorationButton";
import EditorContext from "./EditorContext";

const InlineStyles = [
  { label: "B", style: "BOLD" },
  { label: "I", style: "ITALIC" },
  { label: "U", style: "UNDERLINE" },
];

const InlineStyleButtons = () => {
  const { editorState, setEditorState } = useContext(EditorContext);
  const handleStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <>
      {InlineStyles.map((type) => (
        <DecorationButton
          handleFunction={() => handleStyle(type.style)}
          description="Underline"
          key={type.label}
        >
          {type.label}
        </DecorationButton>
      ))}
    </>
  );
};

export default memo(InlineStyleButtons);
