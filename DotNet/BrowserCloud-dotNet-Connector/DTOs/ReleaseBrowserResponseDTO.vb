Public Class ReleaseBrowserResponseDTO
    Public result As ReleaseBrowserResponseResultDTO

    Public Class ReleaseBrowserResponseResultDTO
        Public message As String
        Public instance_id As String
        Public messageType As String
        Public [error] As String

    End Class
End Class
