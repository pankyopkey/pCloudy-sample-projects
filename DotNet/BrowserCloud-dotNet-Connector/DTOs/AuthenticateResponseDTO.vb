Public Class AuthenticateResponseDTO
    Public result As AuthenticateResposeResultDTO

    Public Class AuthenticateResposeResultDTO
        Public browserCloudAuthToken As String
        Public code As Integer = -1
        Public [error] As String
    End Class

End Class
