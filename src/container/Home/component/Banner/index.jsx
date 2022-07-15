import styles from './style.module.scss';
import avatarImage from './avatar.jpeg';

const Banner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.person}>
        <img className={styles.avatar} src={avatarImage} alt="Dell Lee" />
        <div className={styles.title}>This is the title area</div>
        <div className={styles.description}>This is the description area</div>
      </div>
    </div>
  );
}

export default Banner;