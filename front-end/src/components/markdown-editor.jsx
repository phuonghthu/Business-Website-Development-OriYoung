import { Editor } from "@tinymce/tinymce-react";

const MarkdownEditor = (props) => {
  const onEditorChange = (value) => {
    // eslint-disable-next-line react/prop-types
    props?.onChange(value);
  };

  return (
    <Editor
      {...props}
      outputFormat="text"
      init={{
        height: 500,
        menubar: false,

        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
      onEditorChange={onEditorChange}
    />
  );
};

export default MarkdownEditor;
