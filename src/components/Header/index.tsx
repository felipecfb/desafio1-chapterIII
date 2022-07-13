import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.container}>
      <a href="/">
        <img src="/Logo.png" alt="logo" />
      </a>
    </div>
  );
}
