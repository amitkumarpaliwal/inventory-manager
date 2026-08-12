import styles from './productcard.module.css'

export default function Productcardpage() {
   return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.category}>Electronics</span>
        <span className={styles.status}>Active</span>
      </div>

      <div className={styles.content}>
        <h2 className={styles.name}>Dell Laptop</h2>

        <p className={styles.description}>
        Dell Inspiron
        </p>

        <div className={styles.price}>
        ₹55,000
        </div>
      </div>

       <div className={styles.actions}> 
        <button className={styles.editButton}>
        Edit Product
        </button>
      </div>
    </div> 
    )

}