import { Route, Routes } from "react-router-dom";
import CreateMentor from "../mentor/creatementor";
import CreateStudent from "../student/createstudent";
import AssignMentor from "../studentmentor/assignmentor";

const RouteNav = () => {
  return (
    <Routes>
      <Route path="/" element={<CreateStudent />} exact />
      <Route path="/CreateStudent" element={<CreateStudent />} />
      <Route path="/CreateMentor" element={<CreateMentor />} />
      <Route path="/AssignMentor" element={<AssignMentor />} />
    </Routes>
  );
};
export default RouteNav;
