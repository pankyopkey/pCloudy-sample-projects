Public Class SetResolutionResponse

    Public result As SetResolutionResponseResult

    Public Class SetResolutionResponseResult
        Public [error] As String
        Public message As String
        Public instance_id As String
        Public messageType As String
        Public currentResolution As String
        Public status As String

    End Class

End Class
