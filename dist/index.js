// src/index.ts
var notePlayer = class {
  audioCtx;
  gainNode;
  oscillator;
  DEFAULT_FREQUENCY = 440;
  DEFAULT_OSCILLATOR_TYPE = "sine";
  concert_pitch = 440;
  // based on A4
  CONCERT_PITCH_OCTAVE = 4;
  // based on A4
  temperament = 12;
  noteNames = [
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
    "G#"
  ];
  // Based on Chromatic scale (12-TET) only, TODO: auto detect notes based on temperament
  noteNameRegex = /^(A|B|C|D|E|F|G)(#?)(\d)$/;
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
  setOscillatorType(type) {
    this.oscillator.type = type;
  }
  setFrequency(frequency) {
    this.oscillator.frequency.setValueAtTime(
      frequency,
      this.audioCtx.currentTime
    );
  }
  setGain(gain) {
    this.gainNode.gain.value = gain;
  }
  play(frequency) {
    if (frequency) {
      this.setFrequency(frequency);
    }
    this.gainNode.connect(this.audioCtx.destination);
  }
  stop() {
    this.gainNode.disconnect(this.audioCtx.destination);
  }
  setTemperament(temperament) {
    this.temperament = temperament;
  }
  setConcertPitch(concert_pitch) {
    this.concert_pitch = concert_pitch;
  }
  getFrenquencyFromSteps(steps) {
    const frequency = 2 ** (steps / this.temperament) * this.concert_pitch;
    return frequency;
  }
  getStepsFromFrequency(frequency) {
    const steps = this.temperament * Math.log2(frequency / this.concert_pitch);
    return Math.round(steps);
  }
  getNoteNameFromSteps(steps) {
    const octave = Math.floor(steps / this.temperament) + this.CONCERT_PITCH_OCTAVE;
    let noteIndex = (steps >= 0 ? steps : Math.abs(this.noteNames.length + steps)) % this.temperament;
    return `${this.noteNames[noteIndex]}${octave}`;
  }
  getLowestStep() {
    const step = -this.temperament * this.CONCERT_PITCH_OCTAVE;
    return step;
  }
  getLowestFrequency() {
    const step = this.getLowestStep();
    const frequency = this.getFrenquencyFromSteps(step);
    return frequency;
  }
  getLowestMetrics() {
    return { step: this.getLowestStep(), frequency: this.getLowestFrequency() };
  }
  getFrequencyFromNoteName(noteFullName) {
    console.log("Incoming noteFullName:", noteFullName);
    const match = noteFullName.match(this.noteNameRegex);
    console.log(noteFullName, match);
    if (!match) {
      throw new Error("Invalid note format");
    }
    const [, noteLetter, sharp, octaveStr] = match;
    const noteName = `${noteLetter}${sharp}`;
    const octave = Number(octaveStr);
    const noteIndex = this.noteNames.findIndex((note) => note === noteName);
    if (noteIndex === -1) {
      throw new Error("Invalid note");
    }
    const stepsFromOctave = this.temperament * octave;
    const stepsBase = noteIndex;
    const steps = this.getLowestStep() + stepsFromOctave + stepsBase;
    const frequency = this.getFrenquencyFromSteps(steps);
    return frequency;
  }
};
export {
  notePlayer as default
};
