import React from 'react';
import PropTypes from 'prop-types';
import FileViewer from 'react-file-viewer';
import { Box } from '@material-ui/core';

export default function DocViewer({ fileType, filePath }) {
  return <FileViewer fileType={fileType} filePath={filePath} />;
}

DocViewer.propTypes = {
  fileType: PropTypes.string,
  filePath: PropTypes.string
};
