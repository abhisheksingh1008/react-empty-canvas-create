import BreadCrumb from "./Breadcrumb";
import FantasyExplorer from "./FantasyExplorer";

const page = () => {
  return (
    <div>
      <div className="m-1 mx-2">
        <BreadCrumb />
      </div>
      <FantasyExplorer />
    </div>
  );
};

export default page;
