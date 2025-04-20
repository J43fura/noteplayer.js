<div>
  <div align="center">
    <img width="90" height="90" src="https://github.com/J43fura/noteplayer.js/blob/main/demo/public/NotePlayer_logo_2.png?raw=true" alt="WikiAdviser Logo">
  </div>
  <h1 align="center">noteplayer.js</h1>
  <div align="center">
    <p>
      Play, tune, and transform notes and frequencies in a snap!
    </p>
  </div>
</div>

```sh
npm i noteplayer.js
```
Example usage
```js
import notePlayer from 'noteplayer'
const np = new notePlayer();

np.setFrequency(440); // Sets frequency
np.play(); // Plays note
np.stop(); // Stops note
```

Functions
```js
setOscillatorDefaultSettings(): void;
setOscillatorType(type: OscillatorType): void;

setFrequency(frequency: number): void;

setGain(gain: number): void; // Volume
play(frequency?: number): void;
stop(): void;

setTemperament(temperament: number): void;
setConcertPitch(concert_pitch: number): void; // Also known as A4 pitch

getFrenquencyFromSteps(steps: number): number;
getStepsFromFrequency(frequency: number): number;
getNoteNameFromSteps(steps: number): string;
getFrequencyFromNoteName(noteFullName: string): number;

getLowestStep(): number;
getLowestFrequency(): number;
getLowestMetrics(): {
    step: number;
    frequency: number;
};
