import styles from './style.module.scss';

const Banner = () => {
  return (
    <div className="wrapper">
      <div className={styles.banner}>
        <div className={styles.person}>
          <img className={styles.avatar} src="https://serverless-project-static-files.oss-cn-beijing.aliyuncs.com/images/avatar.jpeg" alt="Dell Lee" />
          <div className={styles.title}>Dell 的个人小站</div>
          <div className={styles.description}>从编程到生活，分享每天的点滴收获，如果你喜欢我的课程，欢迎在这里关注我的动态。希望通过我的课程，能帮助你提升自己的能力，减少焦虑感，更幸福的 Coding。也希望通过课程的录制，让 35 岁后的我还能保持对开发的热情。</div>
        </div>
      </div>
    </div>
  );
}

export default Banner;