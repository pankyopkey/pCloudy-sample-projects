Public Class GetResolutionResponse

    Public result As GetResolutionResponseResult

    Public Class GetResolutionResponseResult
        Public [error] As String
        Public message As String
        Public instance_id As String
        Public messageType As String
        Public currentResolution As String
        Public supportedResolutions() As String

    End Class

End Class
