import style from "./SignUp.module.css";
import FormVol from "../../components/formVol/";
import FormONG from "../../components/formONG/";

function SignUp() {
  return (
    <>
      <div className={style.container}>
        <div className={style.leftPanel}>
          <h1 className={style.logo}>ONGFLOW</h1>
        </div>
        <div className={style.rightPanel}>
          <FormVol />
          {/* <FormONG /> */}
        </div>
      </div>
    </>
  );
}

export default SignUp;
