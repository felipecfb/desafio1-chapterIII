import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a href="/">
          <img src="/Logo.png" alt="logo" />
        </a>
      </Link>
    </div>
  );
}
