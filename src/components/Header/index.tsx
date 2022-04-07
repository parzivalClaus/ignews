import styles from "./styles.module.scss";
import Image from "next/image";
import { SignInButton } from "../SignInButton";
import { ActiveLink } from "../ActiveLink";

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" alt="ig.news" width="110" height="31" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Início</a>
          </ActiveLink>
          <ActiveLink
            activeClassName={styles.active}
            href="/publicacoes"
            prefetch
          >
            <a>Publicações</a>
          </ActiveLink>
        </nav>
        <SignInButton />
      </div>
    </header>
  );
}
