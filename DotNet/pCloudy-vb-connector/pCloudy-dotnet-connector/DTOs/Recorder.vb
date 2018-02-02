Namespace pCloudy.DTO.recorder

    Public Class StartRecorderProcess
        Public result As StartRecorderProcessResult

    End Class

    Public Class StartRecorderProcessResult
        Public [error] As String
        Public URL As String

    End Class

    Public Class FetchRecordedStepsReply
        Public result As RecorderStepsResult

    End Class

    Public Class RecorderStepsResult
        Public [error] As String
        Public token As String
        Public data As RecorderStep()
    End Class

    Public Class RecorderStep
        Public data_serial_no As Integer
        Public recorder_data As String
    End Class


   

End Namespace