import { useContext } from 'react';
import { CountdownContext } from '../context/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown() {

    const {min, sec, hasFinished, startCount, resetCountdown, isActive} = useContext(CountdownContext)

    const [minLeft, minRight] = String(min).padStart(2, '0').split('')
    const [secLeft, secRight] = String(sec).padStart(2, '0').split('')

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minLeft}</span>
                    <span>{minRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secLeft}</span>
                    <span>{secRight}</span>
                </div>
            </div>

            { hasFinished ? (
                <button disabled type="button" className={styles.startCountdownButton}>
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                    <button onClick={resetCountdown} 
                            type="button" 
                            className={`${styles.startCountdownButton} ${styles.startCountdownButtonActive}`}>
                        Abandonar ciclo
                    </button>
                    ) : (
                        <button onClick={startCount} 
                                type="button" 
                                className={styles.startCountdownButton}>
                            Iniciar um ciclo
                        </button>
                    ) } 
                </>
            ) }

                      
        </div>
    );
}