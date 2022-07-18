import { Input, Switch } from 'antd';
import styles from './style.module.scss';

const { TextArea } = Input;

const Banner = (props) => {
  const { attributes = {}, changeAttributes } = props;
  const {
    title, description, showSmallPic, smallPicUrl, backgroundUrl,
    backgroundHeight,
  } = attributes;
  
  const handleShowSmallPicChange = (checked) => {
    if(!checked) {
      changeAttributes({
        showSmallPic: checked,
        smallPicUrl: ''
      })
    }else {
      changeAttributes({showSmallPic: checked})
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles['attribute-row']}>
        <span className={styles.label}>页面标题</span>
        <Input
          value={title}
          className={styles.content}
          placeholder="请输入页面标题"
          onChange={(e) => {changeAttributes({title: e.target.value})}}
        />
      </div>
      <div className={styles['attribute-row']}>
        <span className={styles.label}>页面描述</span>
        <TextArea
          value={description}
          className={styles.content}
          rows={2}
          placeholder="请输入页面描述"
          onChange={(e) => {changeAttributes({description: e.target.value})}}
        />
      </div>
      <div className={styles['attribute-row']}>
        <span className={styles.label}>展示小图</span>
        <Switch checked={showSmallPic} onChange={handleShowSmallPicChange}/>
      </div>
      {
        showSmallPic ? (
          <div className={styles['attribute-row']}>
            <span className={styles.label}>小图链接</span>
            <Input
              value={smallPicUrl}
              className={styles.content}
              placeholder="请输入小图片的 URL 地址"
              onChange={(e) => {changeAttributes({ smallPicUrl: e.target.value })}}
            />
          </div>
        ) : null
      }
      <div className={styles['attribute-row']}>
        <span className={styles.label}>背景链接</span>
        <Input
          value={backgroundUrl}
          className={styles.content}
          placeholder="请输入背景图的 URL 地址"
          onChange={(e) => {changeAttributes({ backgroundUrl: e.target.value })}}
        />
      </div>
      <div className={styles['attribute-row']}>
        <span className={styles.label}>背景高度</span>
        <Input
          type="number"
          value={backgroundHeight}
          className={styles.content}
          placeholder="请输入背景高度的像素值"
          onChange={(e) => {changeAttributes({ backgroundHeight: e.target.value })}}
        />
      </div>
    </div>
  )
}

export default Banner;