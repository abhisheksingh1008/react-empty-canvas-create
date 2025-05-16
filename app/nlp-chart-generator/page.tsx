import ChartGenerator from "@/components/ChartGenerator";
import BreadCrumb from "./Breadcrumb";

export default function Home() {
  return (
    <div>
      <div className="m-1 mx-2">
        <BreadCrumb />
      </div>
      <ChartGenerator />
    </div>
  );
}
