import Header from "@/components/Ong/Header/Header"
import style from './ConviteOng.module.css'

function ConviteOng() {
  return (
    <div className={style.main}>
      <Header />
      <div className={style.convite}>
        <div className={style.convite__title}>
          <h1>Convites</h1>
          <p>Envie convites e descubra quem está pronto para se juntar a você. Acompanhe as respostas, veja quem aceitou e forme sua equipe ideal.</p>
        </div>
      </div>
    </div>
  )
}

export default ConviteOng