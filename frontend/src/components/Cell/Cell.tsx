import { createSignal, Show, type Component } from 'solid-js';
import styles from './Cell.module.css';

const Cell: Component = () => {
  const [isInEditMode, setIsInEditMode] = createSignal(false)
  const [displayText, setDisplayText] = createSignal('Text')

  let inputRef: HTMLInputElement | undefined;

  return (
    <div class={`${styles.cell} ${styles.selected}`} role='cell' 
      onDblClick={() => {
        setIsInEditMode(true);
        if (inputRef) {
          inputRef.focus()
        }
      }}>
      <Show when={isInEditMode()}>
        <input 
        value={displayText()} 
        aria-label='Edit Value'
        onBlur={() => setIsInEditMode(false)}
        ref={inputRef}
        onChange={e => setDisplayText(e.target.value)}
        ></input>
      </Show>
      <Show when={!isInEditMode()}>
        <p aria-label='View Value'>{displayText()}</p>
      </Show>
    </div>
  );
};

export default Cell;
