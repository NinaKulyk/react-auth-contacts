import { useDispatch } from "react-redux";
import s from "./SearchBox.module.css";
import { changeFilter } from "../../redux/filters/filtersSlice";

const SearchBox = () => {
  const dispatch = useDispatch();

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <label htmlFor="input">Find contacts by name</label>
        <input
          className={s.formInput}
          type="text"
          onChange={(e) => dispatch(changeFilter(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SearchBox;
