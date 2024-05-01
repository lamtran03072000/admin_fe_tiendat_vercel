import React, { useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Button, Space } from 'antd';

const TextEditer = ({ keySection, data, refTextEditor }) => {
  const editorRef = useRef();

  return (
    <div>
      <CKEditor
        data={data}
        editor={ClassicEditor}
        config={{
          toolbar: ['bold', 'italic', '|'],
          // toolbar: ['', '', '|'],
        }}
        key={keySection}
        onReady={(editor) => {
          refTextEditor.current = editor;
        }}
        onChange={(event, editor) => {}}
        onBlur={(event, editor) => {
          // setHidden(false);
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
        }}
      ></div>
    </div>
  );
};

export default TextEditer;
