import styles from './confirmModal.module.css'

export default function ConfirmModal({ 
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,}) {

    if(!isOpen) 
    {
        return null;
    }
   return (
    <div className={styles.modalOverlay}>   
      <div className={styles.modalContainer}>
        <h2>{title}</h2>
        <p>{message}</p>

        <div className= {styles.modalButtons}>
          <button
            className= {styles.confirmBtn}
            onClick={onConfirm}
          >
            Yes
          </button>

          <button
            className= {styles.cancelBtn}
            onClick={onCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}



