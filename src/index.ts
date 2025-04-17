export default class notePlayer {
  private audioCtx: AudioContext;
  private gainNode: GainNode;
  private oscillator: OscillatorNode;
  private DEFAULT_FREQUENCY = 440;
  private DEFAULT_OSCILLATOR_TYPE: OscillatorType = "sine";
  constructor() {
    this.audioCtx = new AudioContext();

    this.gainNode = this.audioCtx.createGain();

    this.oscillator = this.audioCtx.createOscillator();
    this.oscillator.connect(this.gainNode);

    this.setOscillatorDefaultSettings();
    this.oscillator.start();
  }

  private setOscillatorDefaultSettings() {
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
}
