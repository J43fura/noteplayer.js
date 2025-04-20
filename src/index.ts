export default class notePlayer {
  private audioCtx: AudioContext;
  private gainNode: GainNode;
  private oscillator: OscillatorNode;
  private DEFAULT_FREQUENCY = 440;
  private DEFAULT_OSCILLATOR_TYPE: OscillatorType = "sine";
  private concert_pitch = 440; // based on A4
  private CONCERT_PITCH_OCTAVE = 4; // based on A4
  private temperament = 12;
  private noteNames = [
    "A",
    "A#",
    "B",
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
  ]; // Based on Chromatic scale (12-TET) only, TODO: auto detect notes based on temperament

  constructor() {
    this.audioCtx = new AudioContext();

    this.gainNode = this.audioCtx.createGain();

    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.connect(this.gainNode);

    this.setOscillatorDefaultSettings();
    this.oscillator.start();
  }

  setOscillatorDefaultSettings() {
    this.oscillator.frequency.setValueAtTime(
      this.DEFAULT_FREQUENCY,
      this.audioCtx.currentTime
    );
    this.oscillator.type = this.DEFAULT_OSCILLATOR_TYPE;
  }

  setOscillatorType(type: OscillatorType) {
    this.oscillator.type = type;
  }
  setFrequency(frequency: number) {
    this.oscillator.frequency.setValueAtTime(
      frequency,
      this.audioCtx.currentTime
    );
  }
  setGain(gain: number) {
    this.gainNode.gain.value = gain;
  }

  play(frequency?: number) {
    if (frequency) {
      this.setFrequency(frequency);
    }
    this.gainNode.connect(this.audioCtx.destination);
  }
  stop() {
    this.gainNode.disconnect(this.audioCtx.destination);
  }

  setTemperament(temperament: number) {
    this.temperament = temperament;
  }
  setConcertPitch(concert_pitch: number) {
    this.concert_pitch = concert_pitch;
  }
  getFrenquencyFromSteps(steps: number) {
    const frequency = 2 ** (steps / this.temperament) * this.concert_pitch;
    return frequency;
  }
  getStepsFromFrequency(frequency: number) {
    const steps = this.temperament * Math.log2(frequency / this.concert_pitch);
    return Math.round(steps);
  }

  getNoteNameFromSteps(steps: number) {
    const octave =
      Math.floor(steps / this.temperament) + this.CONCERT_PITCH_OCTAVE;

    let noteIndex =
      (steps >= 0 ? steps : Math.abs(this.noteNames.length + steps)) %
      this.temperament;
    return `${this.noteNames[noteIndex]}${octave}`;
  }

  getLowestMetrics() {
    const steps = -this.temperament * this.CONCERT_PITCH_OCTAVE;
    const frequency = this.getFrenquencyFromSteps(steps);
    return { steps, frequency };
  }
}
