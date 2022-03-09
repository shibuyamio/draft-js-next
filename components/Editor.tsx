import EditorCore from "./EditorCore";

const Editor = () => {
  return (
    <div className="shadow-sm border border-gray-300 rounded-md sm:text-sm m-5 overflow-scroll h-[500px] p-3">
      <EditorCore />
    </div>
  );
};

export default Editor;
