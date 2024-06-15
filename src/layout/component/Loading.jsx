import styles from "./loading.module.less";
// layout loading

function Loading() {
  const spanList = new Array(20).fill(1).map((_, i) => i);

  return (
    <div className={styles.loadingView}>
      <div className={styles.loading}>
        {spanList.map((i) => (
          <span key={i} style={{ "--i": i }}></span>
        ))}
      </div>
    </div>
  );
}

export default Loading;
