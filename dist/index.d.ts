declare class notePlayer {
    private audioCtx;
    private gainNode;
    private oscillator;
    private DEFAULT_FREQUENCY;
    constructor();
    private setOscillatorDefaultSettings;
    setOscillatorType(type: OscillatorType): void;
    setFrequency(frequency: number): void;
    setGain(gain: number): void;
    play(frequency?: number): void;
    stop(): void;
}

export { notePlayer };
