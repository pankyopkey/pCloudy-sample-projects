Namespace pCloudy.DTO


    Public Class AdbCommandResponseDTO

        Public Property result As AdbCommandResponseResultDTO

        Public Class AdbCommandResponseResultDTO

            Public Property token As String
            Public Property code As Integer
            Public Property [error] As String
            Public Property adbReply As String
            <Obsolete>
            Public Property result As String

        End Class
    End Class

End Namespace