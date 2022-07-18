import styles from './style.module.scss';

const Banner = ({ schema }) => {
  const { attributes = {} } = schema;
  const {
    title, description, showSmallPic, smallPicUrl,
    backgroundUrl, backgroundHeight,
  } = attributes;

  const wrapperStyleObj = backgroundUrl ? {  backgroundImage: `url('${backgroundUrl}')` } : {};
  backgroundHeight && (wrapperStyleObj.height = parseInt(backgroundHeight, 10));
  
  return (
    <div className="wrapper">
      <div className={styles.banner} style={wrapperStyleObj}>
        <div className={styles.person}>
          {
            (showSmallPic && smallPicUrl) ? <img className={styles.avatar} src={smallPicUrl} alt="" /> : null
          }
          <div className={styles.content}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{description}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;