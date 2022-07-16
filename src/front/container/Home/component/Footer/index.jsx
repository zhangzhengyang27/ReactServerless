import styles from './style.module.scss';

const Footer = () => {
  return (
    <div className="wrapper">
      <div className={styles.footer}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <a className={styles.link} href="/admin.html">进入管理页面</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;