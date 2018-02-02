Namespace pCloudy.DTO


    Public Class DeviceTunnelDto
        Public Property result As DeviceTunnelDtoResult

        Public Class DeviceTunnelDtoResult
            Public Property pPort As Integer
            Public Property code As Integer
            Public Property [error] As String
        End Class
    End Class

End Namespace