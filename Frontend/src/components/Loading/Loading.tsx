import style from "./Loading.module.css";

function Loading() {
  return (
    <div className={style.loading_container}>
      <div className={style.loader}></div>
      <p>Carregando...</p>
    </div>
  );
}

export default Loading;
