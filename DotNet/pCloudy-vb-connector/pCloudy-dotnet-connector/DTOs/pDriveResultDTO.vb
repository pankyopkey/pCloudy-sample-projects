Namespace pCloudy.DTO

#Region "Upload File"

    Public Class uploadFileDTO

        Public Property result As uploadFileResultDTO

    End Class

    Public Class uploadFileResultDTO

        Public Property token As String
        Public Property code As Integer
        Public Property File As String

        Public Property [error] As String

    End Class

#End Region

#Region "Get Files"

    Public Class GetUploadedFilesDTO

        Public Property result As GetUploadFilesResultDTO

    End Class

    Public Class GetUploadFilesResultDTO

        Public Property token As String
        Public Property code As Integer
        Public Property files As pDriveFileDTO()

        Public Property [error] As String

    End Class


    Public Class pDriveFileDTO
        Public Property [file] As String
        Public Property size_KB As Integer
        Private Property time_UTC As String

        Public ReadOnly Property UploadedOn_UTC As Date
            Get
                time_UTC = time_UTC.Replace(" (UTC)", "")
                Dim dt = CDate(time_UTC)
                dt = Date.SpecifyKind(dt, DateTimeKind.Utc)
                Return dt
            End Get
        End Property
    End Class

#End Region

End Namespace
