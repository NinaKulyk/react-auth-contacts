import s from "./Loading.module.css";
import { ClimbingBoxLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className={s.container}>
      <ClimbingBoxLoader size={50} />
    </div>
  );
};

export default Loading;
