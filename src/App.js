import styles from './App.module.css';
import JCard from './components/JCard';

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.mainColumn}>
        <h1>MIXTAPE J-CARD GENERATOR</h1>
        <JCard />
      </div>
    </div>
  );
}

export default App;
