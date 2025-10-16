import Header from "@/components/Voluntario/Header/Header";
import style from "./HomeVoluntario.module.css";
function HomeVoluntario() {

  return (
    <>
      <Header />
      <div className={style.container__title}>
        <h1>Conecte-se com causas, Transforme Vidas</h1>
        {/* <Info className={`w-[100px] h-[100px] ${style.suamae}`} /> */}
        <p>
          Conecte-se com causas que importam e apoie projetos de ONGs que
          transformam vidas. Use suas habilidades para fazer a diferença!
        </p>
      </div>
    </>
  );
}

export default HomeVoluntario;
