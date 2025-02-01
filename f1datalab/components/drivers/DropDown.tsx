import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export function DropDown() {
    return (
<Select>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="2024" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="2024">2024</SelectItem>
    <SelectItem value="2023">2023</SelectItem>
    <SelectItem value="2022">2022</SelectItem>
    <SelectItem value="2021">2021</SelectItem>
    <SelectItem value="2020">2020</SelectItem>
  </SelectContent>
</Select>


    );
}