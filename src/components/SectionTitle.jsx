import { ArrowRight } from "lucide-react";
import { Button } from "../admin/components/ui/Button";
import Title from "./Title";

function SectionTitle({ className, children }) {
  return (
    <div className={`${className} flex justify-between items-center`}>
      {children}
    </div>
  );
}

export default SectionTitle;
