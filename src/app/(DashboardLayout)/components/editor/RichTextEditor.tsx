'use client'
import React from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Box, Typography } from '@mui/material';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link', 'image',
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {

  return (
    <Box sx={{
      height: '360px',
      width: '100%'
    }}
    >
      <Typography variant="body1" gutterBottom style={{ marginTop: 10, marginBottom:10 }}>
        Description
      </Typography>
      <Quill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        theme="snow"
        style={{ height: '350px' }}
      />
    </Box>
  );
};

export default RichTextEditor;
