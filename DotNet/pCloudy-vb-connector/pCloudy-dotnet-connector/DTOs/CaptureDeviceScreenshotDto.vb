Namespace pCloudy.DTO
    Public Class CaptureDeviceScreenshotDto
        Public Property result As CaptureDeviceScreenshotResultDto

    End Class

    Public Class CaptureDeviceScreenshotResultDto
        Public Property [error] As String
        Public Property token As String
        Public Property code As Integer
        Public Property filename As String
        Public Property dir As String

    End Class
End Namespace