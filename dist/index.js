// src/index.ts
var notePlayer = class {
  audioCtx;
  gainNode;
  oscillator;
  DEFAULT_FREQUENCY = 440;
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
    this.oscillator.type = "sine";
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
    this.gainNode.gain.setValueAtTime(gain, this.audioCtx.currentTime);
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
};
export {
  notePlayer as default
};
