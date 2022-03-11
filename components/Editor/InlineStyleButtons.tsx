import { EditorState, RichUtils } from "draft-js";
import { Dispatch, SetStateAction } from "react";
import DecorationButton from "./DecorationButton";
type Props = {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
};

const InlineStyles = [
  { label: "B", style: "BOLD" },
  { label: "I", style: "ITALIC" },
  { label: "U", style: "UNDERLINE" },
];

const InlineStyleButtons = ({ editorState, setEditorState }: Props) => {
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

export default InlineStyleButtons;
