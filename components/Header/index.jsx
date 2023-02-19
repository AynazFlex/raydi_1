import Link from "next/link";
import styles from "./header.module.sass";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="container__elem container__elem--8 container__elem--df container__elem--aic">
          <Link href="/" className={styles.logo}>
            <img src="img/design/logo.svg" alt="" />
          </Link>
          <nav className={styles.menu}>
            <Link href="/services">Услуги</Link>
            <Link href="/reviews">Отзывы</Link>
            <Link href="/kak">Как это работает</Link>
            <Link href="/preim">Преимущества</Link>
            <Link href="/faq">Частые вопросы</Link>
            <Link href="/cabinet">кабинет</Link>
            <Link href="/reset">reset</Link>
            <Link href="/recovery">recovery</Link>
            <Link href="/settings">settings</Link>
          </nav>
        </div>
        <div className="container__elem container__elem--4 container__elem--df container__elem--aic container__elem--jcfend">
          312
        </div>
      </div>
    </header>
  );
};

export default Header;
