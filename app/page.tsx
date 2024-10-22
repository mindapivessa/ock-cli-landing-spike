import Cli from "@/components/cli";
import { Sandpack } from "@codesandbox/sandpack-react";   
import SandpackComponent from "@/components/sandpack"; 

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Cli />
      <div className="flexjustify-center items-center px-100px">
        <SandpackComponent /> 
      </div>
    </div>
  );
}
