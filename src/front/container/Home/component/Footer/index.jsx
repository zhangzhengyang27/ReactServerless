import styles from './style.module.scss';

const Footer = ({ schema }) => {
  const { attributes = {}, children = [] } = schema;
  const { copyright, record } = attributes;
  return (
    <div className="wrapper">
      <div className={styles.footer}>
        <ul className={styles.list}>
        {
          children.map((item, index) => {
            const { attributes = {} } = item;
            const { title, link } = attributes;
            return (
              <li className={styles.item} key={index}>
                <a className={styles.link} href={link} target="_blank" rel="noreferrer">
                  {title}
                </a>
              </li>
            )
          })
        }
        </ul>
        <div className={styles.copyright}>
          {copyright} {record}
        </div>
      </div>
    </div>
  );
}

export default Footer;