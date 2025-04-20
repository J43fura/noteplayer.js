# noteplayer.js

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
