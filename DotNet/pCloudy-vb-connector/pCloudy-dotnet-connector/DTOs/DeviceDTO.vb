Namespace pCloudy.DTO

    Public Class devicesDTO
        Public Property result As devicesDtoResult

    End Class

    Public Class devicesDtoResult
        Public Property [error] As String
        Public Property token As String
        Public Property code As Integer
        Public Property models As MobileDeviceDTO()

    End Class

End Namespace