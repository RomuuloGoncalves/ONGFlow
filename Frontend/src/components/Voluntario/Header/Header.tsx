import { Usuario } from "@/assets/icons/Usuario"
import { Convite } from "@/assets/icons/Convite"
import { Link } from 'react-router-dom';

import Logo from '@/assets/Logo.svg'
import style from './Header.module.css'

function Header() {
  return (
      <>
        <div className={style.container__header}>
          <div className={style.logo}>
           <Link to="/home/voluntario">
             <img src={Logo} alt="Logo" />
           </Link>
          </div>
          <div className={style.buttons}>
            <Link to="/convite/voluntario" className={`${style.invite} ${style.button}`}>
                <Convite />
                Convites
            </Link>
            <Link to="/perfil/voluntario" className={`${style.user} ${style.button}`}>
                <Usuario />
            </Link>
          </div>
        </div>
      </>
  )
}

export default Header