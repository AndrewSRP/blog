const FileAbsolutePath = (fileAbsolutePath) => {
  // "/post.md" => post
  const reg = /\/posts\/[\-a-zA-Z]+.md/.exec(fileAbsolutePath);
  if (!(reg && reg[0])) { return ''; }
  return reg[0].substring(0, reg[0].length - 3)
};

export default FileAbsolutePath;
