import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextEditorMenuBar from "./TextEditorMenuBar";
import { useEffect } from "react";

type TextEditorProps = {
  onChange: (content: string) => void;
  initialContent?: string;
};

export default function RichTextEditor({
  onChange,
  initialContent = "",
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: initialContent,
    onUpdate: ({ editor }) => {
      // Only send HTML content if it's not empty
      const html = editor.getHTML();
      if (html === "<p></p>") {
        onChange("");
      } else {
        onChange(html);
      }
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
      },
    },
    immediatelyRender: false,
  });

  // Update editor content when initialContent changes
  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  return (
    <div>
      <TextEditorMenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
