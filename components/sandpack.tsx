import { Sandpack } from "@codesandbox/sandpack-react";

const SandpackComponent = () => {
  const files = {};
  
  return (
    <Sandpack
      files={files} 
      theme="dark" 
      template="react"
      options={{ editorHeight: "400px" }}
    />
  );
}

export default SandpackComponent; // Export the component for use in other files
