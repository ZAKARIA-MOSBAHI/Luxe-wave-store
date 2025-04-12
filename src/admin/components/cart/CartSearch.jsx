import { Input } from "../ui/Input";
import { Search } from "lucide-react";

const CartSearch = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center mb-6">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by user or email..."
          className="w-full pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CartSearch;
