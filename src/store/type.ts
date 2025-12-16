export type MeasureConversionState = {
    input: {
        value: number | string;
        unit: string;
    };
    output: {
        value: number | string;
        unit: string;
        precision: number;
    };
    isDevMode: boolean;
    isSwitching: boolean;
};

export type MeasureConversationActions = {
    setInput: (input: Partial<MeasureConversionState['input']>) => void;
    setOutput: (output: Partial<MeasureConversionState['output']>) => void;
    setIsDevMode: (isDevMode: boolean) => void;
    setIsSwitching: (value: boolean) => void;
};

export type MeasureConversionStore = MeasureConversionState & MeasureConversationActions;
