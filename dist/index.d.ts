declare class notePlayer {
    private audioCtx;
    private gainNode;
    private oscillator;
    private DEFAULT_FREQUENCY;
    private DEFAULT_OSCILLATOR_TYPE;
    private concert_pitch;
    private CONCERT_PITCH_OCTAVE;
    private temperament;
    private noteNames;
    private noteNameRegex;
    constructor();
    setOscillatorDefaultSettings(): void;
    setOscillatorType(type: OscillatorType): void;
    setFrequency(frequency: number): void;
    setGain(gain: number): void;
    play(frequency?: number): void;
    stop(): void;
    setTemperament(temperament: number): void;
    setConcertPitch(concert_pitch: number): void;
    getFrenquencyFromSteps(steps: number): number;
    getStepsFromFrequency(frequency: number): number;
    getNoteNameFromSteps(steps: number): string;
    getLowestStep(): number;
    getLowestFrequency(): number;
    getLowestMetrics(): {
        step: number;
        frequency: number;
    };
    getFrequencyFromNoteName(noteFullName: string): number;
}

export { notePlayer as default };
