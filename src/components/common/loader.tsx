import { Loader2 } from "lucide-react";

const Loader = ({ size = 20 }: { size?: number }) => {
  return (
    <span>
      <Loader2 size={size} className="animate-spin" />
    </span>
  );
};

export default Loader;
