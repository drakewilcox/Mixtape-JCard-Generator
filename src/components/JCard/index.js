import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from './JCard.module.css';
import clsx from 'clsx';

function JCard() {
  const printRef = useRef(null);

  const handleDownloadPDF = useReactToPrint({
    contentRef: printRef,
  });

  const [sideAContent, setSideAContent] = useState('');
  const [sideBContent, setSideBContent] = useState('');
  const [title, setTitle] = useState('DESTROY THE EMPIRE');
  const [subTitle, setSubTitle] = useState('DUB SOUND SYSTEM SELECTIONS');
  const [coverImage, setCoverImage] = useState(null);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [bgColor, setBgColor] = useState('#ffffff');
  const [textColor, setTextColor] = useState('#000000');
  const [titleColor, setTitleColor] = useState('#000000');
  const [titleOutline, setTitleOutline] = useState('#000000');
  const [outlineEnabled, setOutlineEnabled] = useState(false);
  const [specifyTitleColor, setSpecifyTitleColor] = useState(false);
  const [titleFontSize, setTitleFontSize] = useState(30);
  const [trackFontSize, setTrackFontSize] = useState(10);
  const [titleLetterSpacing, setTitleLetterSpacing] = useState(0);
  const [subTitleFontSize, setSubTitleFontSize] = useState(12);
  const [subTitleLetterSpacing, setSubTitleLetterSpacing] = useState(0);
  const [tracklistHeader, setTracklistHeader] = useState('');
  const [coverImageName, setCoverImageName] = useState('No file chosen');
  const [flapTopLeftText, setFlapTopLeftText] = useState('Recording Date:');
  const [flapTopRightText, setFlapTopRightText] = useState('');
  const [flapDescriptionText, setFlapDescriptionText] = useState(''); // Full width text

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get selected file
    if (file) {
      setCoverImageName(file.name); // Update file name display
      setCoverImage(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  const handleMove = (axis, value) => {
    setImagePosition((prev) => ({ ...prev, [axis]: value }));
  };

  const getTextOutlineStyle = () => {
    if (!outlineEnabled) {
      return {}; // No outline when checkbox is unchecked
    }
    return {
      WebkitTextStroke: `1px ${titleOutline}`, // Sharp outline
      // textShadow: `
      //   -1px -1px 0 ${titleOutline},
      //    1px -1px 0 ${titleOutline},
      //   -1px  1px 0 ${titleOutline},
      //    1px  1px 0 ${titleOutline}
      // `,
    };
  };
  return (
    <div className={styles.twoColContainer}>
      <div className={styles.preview}>
        <div ref={printRef} className={clsx(styles.template, styles.printable)}>
          <div className={clsx(styles.template, styles.boundaries)}>
            <div className={clsx(styles.bleed)} />
            <div className={clsx(styles.template, styles.crop)} />
            <div className={clsx(styles.fold, styles.fold1)} />
            <div className={clsx(styles.fold, styles.fold2)} />
            <div className={clsx(styles.fold, styles.fold3)} />
          </div>
          <div className={clsx(styles.template, styles.tracklist)}>
            <table className={styles.trackTable}>
              <thead>
                <tr>
                  <th colSpan="2" className={styles.tracklistHeaderRow}>
                    <div className={styles.headerContainer}>
                      <span
                        style={{ backgroundColor: textColor, color: bgColor }}
                      >
                        A
                      </span>
                      <span>{tracklistHeader}</span>
                      <span
                        style={{ backgroundColor: textColor, color: bgColor }}
                      >
                        B
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...Array(totalRows)].map((_, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        fontSize: `${trackFontSize}px`,
                      }}
                    >
                      {sideATracks[index] || ''}
                    </td>
                    <td
                      style={{
                        fontSize: `${trackFontSize}px`,
                      }}
                    >
                      {sideBTracks[index] || ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            className={clsx(styles.template, styles.cover)}
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            {coverImage ? (
              <div
                className={styles.coverImageWrapper}
                style={{
                  transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) scale(${scale})`,
                }}
              >
                <img
                  src={coverImage}
                  alt="Cover Preview"
                  className={styles.coverImage}
                />
              </div>
            ) : (
              <p className={styles.coverPlaceholder}></p>
            )}
          </div>
          <div
            className={clsx(styles.template, styles.title)}
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <div className={styles.titleContainer}>
              <div
                className={styles.titleText}
                style={{
                  color: specifyTitleColor ? titleColor : textColor,
                  fontSize: `${titleFontSize}px`,
                  letterSpacing: `${titleLetterSpacing}px`,
                  ...getTextOutlineStyle(),
                }}
              >
                {title}
              </div>
              <div
                className={styles.subTitleText}
                style={{
                  fontSize: `${subTitleFontSize}px`,
                  letterSpacing: `${subTitleLetterSpacing}px`,
                }}
              >
                {subTitle}
              </div>
            </div>
          </div>
          <div
            className={clsx(styles.template, styles.flap)}
            style={{ backgroundColor: bgColor, color: textColor }}
          >
            <div className={styles.flapContainer}>
              {(flapTopLeftText || flapTopRightText) && (
                <div className={styles.flapTop}>
                  <div className={styles.flapLeft}>{flapTopLeftText}</div>
                  <div className={styles.flapRight}>{flapTopRightText}</div>
                </div>
              )}
              <div className={styles.flapBottom}>{flapDescriptionText}</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.editor}>
        <h3>COVER IMAGE</h3>

        <div className={styles.imageControls}>
          <div className={styles.fileInputContainer}>
            <label className={styles.fileLabel}>
              Choose File
              <input
                type="file"
                accept="image/*"
                className={styles.hiddenFileInput}
                onChange={handleImageUpload}
              />
            </label>
            <span className={styles.fileName}>{coverImageName}</span>
          </div>

          <label className={styles.range}>
            X
            <input
              type="range"
              min="-200"
              max="200"
              value={imagePosition.x}
              onChange={(e) => handleMove('x', parseInt(e.target.value, 10))}
            />
          </label>
          <label className={styles.range}>
            Y
            <input
              type="range"
              min="-200"
              max="200"
              value={imagePosition.y}
              onChange={(e) => handleMove('y', parseInt(e.target.value, 10))}
            />
          </label>
          <label className={styles.range}>
            Scale
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.05"
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
            />
          </label>
        </div>
        <h3>SHARED COLOR OPTIONS</h3>
        <div className={styles.colorPickers}>
          <div className={styles.pickerContainer}>
            <label>BACKGROUND COLOR</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
          <div className={styles.pickerContainer}>
            <label>TEXT COLOR</label>
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
            />
          </div>
        </div>

        <h3>SPINE</h3>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Enter Title for Spine"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Enter Subtitle"
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
        />
        <h5>TITLE</h5>
        <div className={styles.twoColGrid}>
          <div className={styles.sizePicker}>
            <label>TITLE FONT SIZE</label>
            <input
              type="number"
              min="5"
              max="100"
              step="1"
              value={titleFontSize}
              onChange={(e) => setTitleFontSize(parseInt(e.target.value, 10))}
            />
          </div>

          <div className={styles.sizePicker}>
            <label>TITLE LETTER SPACING</label>
            <input
              type="number"
              min="-5"
              max="20"
              step="0.5"
              value={titleLetterSpacing}
              onChange={(e) =>
                setTitleLetterSpacing(parseFloat(e.target.value))
              }
            />
          </div>
          <div className={styles.pickerContainer}>
            <label>SPECIFY TITLE COLOR</label>
            <input
              type="checkbox"
              checked={specifyTitleColor}
              onChange={(e) => setSpecifyTitleColor(e.target.checked)}
            />
          </div>
          {specifyTitleColor ? (
            <div className={styles.pickerContainer}>
              <label>TITLE COLOR</label>
              <input
                type="color"
                value={titleColor}
                disabled={!specifyTitleColor}
                onChange={(e) => setTitleColor(e.target.value)}
              />
            </div>
          ) : (
            <div className={styles.pickerContainer} />
          )}

          <div className={styles.pickerContainer}>
            <label>ENABLE TITLE OUTLINE</label>
            <input
              type="checkbox"
              checked={outlineEnabled}
              onChange={(e) => setOutlineEnabled(e.target.checked)}
            />
          </div>
          {outlineEnabled ? (
            <div className={styles.pickerContainer}>
              <label>TITLE OUTLINE COLOR</label>
              <input
                type="color"
                value={titleOutline}
                disabled={!outlineEnabled}
                onChange={(e) => setTitleOutline(e.target.value)}
              />
            </div>
          ) : (
            <div className={styles.pickerContainer} />
          )}

          <h5>SUBTITLE</h5>
          <div className={styles.sizePicker}>
            <label>SUBTITLE FONT SIZE</label>
            <input
              type="number"
              min="5"
              max="50"
              value={subTitleFontSize}
              onChange={(e) =>
                setSubTitleFontSize(parseInt(e.target.value, 10))
              }
            />
          </div>
          <div className={styles.sizePicker}>
            <label>Subtitle Letter Spacing</label>
            <input
              type="number"
              min="-5"
              max="20"
              step="0.5"
              value={subTitleLetterSpacing}
              onChange={(e) =>
                setSubTitleLetterSpacing(parseFloat(e.target.value))
              }
            />
          </div>
        </div>

        <h3>TRACKLIST</h3>
        <input
          type="text"
          className={styles.titleInput}
          placeholder="Tracklist Header Text"
          value={tracklistHeader}
          onChange={(e) => setTracklistHeader(e.target.value)}
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
        <div className={styles.sizePicker}>
          <label>TRACK NAME FONT SIZE</label>
          <input
            type="number"
            min="5"
            max="100"
            step="1"
            value={trackFontSize}
            onChange={(e) => setTrackFontSize(parseInt(e.target.value, 10))}
          />
        </div>
        <h3>BACK FLAP</h3>
        <div className={styles.backFlapInputs}>
          <div className={styles.twoColFlapInputs}>
            <div className={styles.inputAndLabelContainer}>
              <label>FLAP TOP LEFT</label>
              <input
                type="text"
                className={styles.titleInput}
                value={flapTopLeftText}
                onChange={(e) => setFlapTopLeftText(e.target.value)}
              />
            </div>
            <div className={styles.inputAndLabelContainer}>
              <label>FLAP TOP RIGHT</label>
              <input
                type="text"
                className={styles.titleInput}
                value={flapTopRightText}
                onChange={(e) => setFlapTopRightText(e.target.value)}
              />
            </div>
          </div>

          <div></div>
          <div className={styles.inputAndLabelContainer}>
            <label>FLAP DESCRIPTION</label>
            <textarea
              className={styles.textArea}
              value={flapDescriptionText}
              onChange={(e) => setFlapDescriptionText(e.target.value)}
            />
          </div>
          <button className={styles.print} onClick={handleDownloadPDF}>
            PRINT
          </button>
        </div>
      </div>
    </div>
  );
}

export default JCard;
