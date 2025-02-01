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
    <SelectItem value="light">2024</SelectItem>
    <SelectItem value="dark">2023</SelectItem>
    <SelectItem value="dark">2022</SelectItem>
    <SelectItem value="dark">2021</SelectItem>
    <SelectItem value="dark">2020</SelectItem>
  </SelectContent>
</Select>


    );
}