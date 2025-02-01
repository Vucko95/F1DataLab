// /app/drivers/page.tsx
import { TopSection } from "@/components/drivers/TopSection";
import { DriverCard } from "@/components/drivers/DriverCard";
import { DropDown } from "@/components/drivers/DropDown"
export default function DriversPage() {
  return (
    <div className="p-6">
      <div className="pb-8 pl-2">
      <DropDown/>
      </div>
      {/* <TopSection /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 justify-items-center">

        <DriverCard  />
        <DriverCard  />
        <DriverCard  />
        <DriverCard  />

      </div>
    </div>
  );
}