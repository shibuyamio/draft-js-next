import { Listbox, Transition } from "@headlessui/react";
import { MenuAlt2Icon } from "@heroicons/react/solid";
import { RichUtils } from "draft-js";
import { Fragment, memo, useContext, useEffect, useState } from "react";
import EditorContext from "./EditorContext";
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const BLOCK_TYPES = [
  { label: "スタイルなし", style: "unstyled" },
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "リスト", style: "unordered-list-item" },
  { label: "番号付きリスト", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

type OptionProps = {
  blockStyle: {
    label: string;
    style: string;
  };
};

const BlockStyleOption = ({ blockStyle }: OptionProps) => (
  <Listbox.Option
    className={({ active }) =>
      classNames(
        active ? "bg-gray-100" : "bg-white",
        "cursor-default select-none relative py-2 px-3"
      )
    }
    value={blockStyle}
  >
    <div className="flex items-center">
      <span className="block font-medium truncate">{blockStyle.label}</span>
    </div>
  </Listbox.Option>
);

const BlockStyleControles = () => {
  const { editorState, setEditorState } = useContext(EditorContext);
  const [blockStyle, setBlockStyle] = useState(BLOCK_TYPES[0]);
  const [currentType, setCurrentType] = useState("");

  const selection = editorState.getSelection();

  useEffect(() => {
    setCurrentType(
      editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType()
    );
  }, [editorState, selection]);

  useEffect(() => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle.style));
  }, [blockStyle]);

  return (
    <Listbox
      as="div"
      value={blockStyle}
      onChange={setBlockStyle}
      className="flex-shrink-0"
    >
      {({ open }) => (
        <>
          <Listbox.Label className="sr-only">Select Style</Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative inline-flex items-center rounded-full py-2 px-2 bg-gray-50 text-sm font-medium text-gray-500 whitespace-nowrap hover:bg-gray-100 sm:px-3">
              <MenuAlt2Icon
                className={classNames(
                  blockStyle.style !== currentType
                    ? "text-gray-300"
                    : "text-gray-500",
                  "flex-shrink-0 h-5 w-5 sm:-ml-1"
                )}
                aria-hidden="true"
              />
              <span
                className={classNames(
                  blockStyle.style !== currentType ? "" : "text-gray-900",
                  "hidden truncate sm:ml-2 sm:block"
                )}
              >
                {blockStyle.label === null ? "Style..." : blockStyle.label}
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute right-0 z-10 mt-1 w-52 bg-white shadow max-h-56 rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {BLOCK_TYPES.map((type) => (
                  <BlockStyleOption key={type.label} blockStyle={type} />
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default memo(BlockStyleControles);
