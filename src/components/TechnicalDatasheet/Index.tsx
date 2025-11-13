import { TechnicalDatasheetHeader } from "./TechnicalDatasheetHeader";
import { TechnicalDatasheetContent } from "./TechnicalDatasheetContent";

export const TechnicalDatasheet = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TechnicalDatasheetHeader />
      <TechnicalDatasheetContent />
    </div>
  );
};
