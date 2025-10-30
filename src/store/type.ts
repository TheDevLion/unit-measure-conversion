export type MeasureConversionState = {
    input: {
        value: number | string;
        unit: string;
    }
    output: {
        unit: string;
        precision: number;
    }
}

export type MeasureConversationActions = {
    setInput: (input: Partial<MeasureConversionState['input']>) => void;
    setOutput: (output: Partial<MeasureConversionState['output']>) => void;
}

export type MeasureConversionStore = MeasureConversionState & MeasureConversationActions;