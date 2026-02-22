import { Suspense } from "react";
import LeadsTable from "./LeadsTable";

export const metadata = {
  title: "Leads | Admin | CODE: ABUNDANCE",
};

export default function LeadsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LeadsTable />
    </Suspense>
  );
}
