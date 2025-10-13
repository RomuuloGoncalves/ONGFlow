import style from './Header.module.css';

function Header(): JSX.Element {
  return (
    <div className={style.container__header}>
        <div className={style.container__header_logoLink}>
            <div className={style.container__header_logo}></div>
            <div className={style.container__header_links}>
                <ul>
                    <li><a href=""></a></li>
                    <li><a href="">Convites</a></li>
                </ul>
            </div>
        </div>
        <div className={style.container__header_profile}>

        </div>
    </div>
  );
}

export default Header;
