import Header from "@/components/Voluntario/Header";
import style from "./HomeVoluntario.module.css";
import { Info } from "@/assets/icons/Info";
import { Medalha } from "@/assets/icons/Medalha";
import { Alvo } from "@/assets/icons/Alvo";
import { useNavigate } from "react-router-dom";

function HomeVoluntario() {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      icon: Medalha,
      text: "Projetos Concluídos",
      route: "/projetos/concluidos",
    },
    {
      id: 2,
      icon: Info,
      text: "Projetos Disponíveis",
      route: "/projetos/disponiveis",
    },
    {
      id: 3,
      icon: Alvo,
      text: "Projetos em Andamento",
      route: "/projetos/andamento",
    },
  ];

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
      <div className={style.container__cards}>
        {cards.map((card) => (
          <div className={style.card} key={card.id}>
            <div className={style.container__icon}>
              <card.icon className={`w-[32px] h-[32px] ${style.icon}`} />
            </div>
            <p>{card.text}</p>

            <button onClick={() => navigate(card.route)}>Ver mais</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default HomeVoluntario;
