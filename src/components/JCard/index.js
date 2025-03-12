import { useState } from 'react';

import styles from './JCard.module.css';
import clsx from 'clsx';

function JCard() {
  const [sideAContent, setSideAContent] = useState('');
  const [sideBContent, setSideBContent] = useState('');
  const [title, setTitle] = useState('');

  // Convert text input into arrays, removing empty lines
  const sideATracks = sideAContent
    .split('\n')
    .filter((track) => track.trim() !== '');
  const sideBTracks = sideBContent
    .split('\n')
    .filter((track) => track.trim() !== '');

  const totalRows = Math.max(
    10,
    Math.max(sideATracks.length, sideBTracks.length)
  );
  return (
    <div>
      <div className={styles.preview}>
        <div className={clsx(styles.template, styles.printable)}>
          <div className={clsx(styles.template, styles.boundaries)}>
            <div className={clsx(styles.bleed)} />
            <div className={clsx(styles.template, styles.crop)} />
          </div>
          <div className={clsx(styles.template, styles.tracklist)}>
            <table className={styles.trackTable}>
              <thead>
                <tr>
                  <th>Side A</th>
                  <th>Side B</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(totalRows)].map((_, index) => (
                  <tr key={index}>
                    <td>{sideATracks[index] || ''}</td>
                    <td>{sideBTracks[index] || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={clsx(styles.template, styles.cover)}>Cover</div>
          <div className={clsx(styles.template, styles.title)}>
            <div className={styles.titleText}>{title}</div>
          </div>
          <div className={clsx(styles.template, styles.flap)}>Flap</div>
        </div>
      </div>

      <div className={styles.editor}>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Enter J-Card Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className={styles.textArea}
          placeholder="Enter Side A tracks (one per line)"
          value={sideAContent}
          onChange={(e) => setSideAContent(e.target.value)}
        />
        <textarea
          className={styles.textArea}
          placeholder="Enter Side B tracks (one per line)"
          value={sideBContent}
          onChange={(e) => setSideBContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default JCard;
