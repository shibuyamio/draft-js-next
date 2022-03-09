import { ContentBlock } from "draft-js";

// TODO: コードスタイルの表示が微妙なので直す
export default function blockStyleFn(contentBlock: ContentBlock) {
  const type = contentBlock.getType();

  switch (type) {
    case "blockquote":
      return "px-4 py-2 border-l-4 bg-neutral-100 text-neutral-600 border-neutral-300 quote not-italic";
  }

  return "";
}
