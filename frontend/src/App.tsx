import type { Component } from 'solid-js';
import Cell from './components/Cell/Cell';

const App: Component = () => {
  return (
    <div class="text-4xl text-green-700 text-center py-20">
      <Cell />
    </div>
  );
};

export default App;
