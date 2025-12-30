import { createSignal, Show, type Component } from 'solid-js';
import styles from './Cell.module.css';

const Cell: Component = () => {
  const [isInEditMode] = createSignal(true)
  const [displayText] = createSignal('Text')
  return (
    <div class={styles.cell}>
      <Show when={isInEditMode()}>
        <input value={displayText()}></input>
      </Show>
      <Show when={!isInEditMode()}>
        <p>{displayText()}</p>
      </Show>
    </div>
  );
};

export default Cell;
