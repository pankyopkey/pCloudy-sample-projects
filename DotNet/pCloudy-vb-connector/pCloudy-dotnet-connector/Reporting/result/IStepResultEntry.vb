Public Interface IStepResultEntry

    Function getText() As String

    Function type() As StepResultEntryType

    Enum StepResultEntryType
        Comment
        StepResult
    End Enum

End Interface
