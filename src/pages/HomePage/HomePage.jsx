import s from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={s.container}>
      <img src="/img/sdfgh.png" alt="phonebook" width={600} />
      <h2>
        ALL YOUR CONTACTS <br /> IN ONE PLACE
      </h2>
    </div>
  );
};

export default HomePage;
