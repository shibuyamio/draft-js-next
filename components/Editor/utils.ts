import { convertFromRaw, convertToRaw, EditorState } from "draft-js";
import debounce from "lodash.debounce";

export const saveContent = debounce((editorState: EditorState, id?: string) => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  window.localStorage.setItem(
    id || "draftjscontent",
    JSON.stringify(rawContentState)
  );
}, 1000);

export const getInitialContent = (id?: string) => {
  const content = window.localStorage.getItem(id || "draftjscontent");
  if (content) {
    return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
  }

  return EditorState.createEmpty();
};

export const removeLocalStorageItem = (id?: string) => {
  window.localStorage.removeItem(id || "draftjscontent");
};