import style from "./LoadingButton.module.css";

function Loading() {
  return (
    <div className={style.loading_container}>
      <div className={style.loader}></div>
    </div>
  );
}

export default Loading;
