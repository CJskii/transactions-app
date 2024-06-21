import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectChainDropdown = ({
  selectedChainName,
  chains,
  onChange,
}: {
  selectedChainName: string;
  chains: { id: number; name: string }[];
  onChange: (value: number) => void;
}) => {
  return (
    <Select onValueChange={(value: string) => onChange(parseInt(value, 10))}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={selectedChainName} />
      </SelectTrigger>
      <SelectContent>
        {chains.map((chain) => (
          <SelectItem key={chain.id} value={chain.id.toString()}>
            {chain.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
