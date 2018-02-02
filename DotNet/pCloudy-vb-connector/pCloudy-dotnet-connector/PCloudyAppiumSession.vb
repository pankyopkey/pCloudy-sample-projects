Imports ssts.util.pCloudy.DTO

Namespace pCloudy.AppiumAPIs

    Public Class PCloudyAppiumSession

        Public Property con As pCloudyClient
        Public Property authToken As String
        Public Property bookingDto As DTO.appium.BookingDtoDevice

        Public Sub New(con As pCloudyClient, authToken As String, bookingDto As DTO.appium.BookingDtoDevice)
            Me.con = con
            Me.authToken = authToken
            Me.bookingDto = bookingDto
        End Sub

        Public Sub releaseSessionNow()
            con.releaseAppiumSession(authToken, bookingDto)
        End Sub

        Public Sub extendSession(releaseAfter As TimeSpan)
            con.extendAppiumSession(authToken, bookingDto, releaseAfter)
        End Sub

        Public Function takeScreenShot() As System.IO.FileInfo
            Dim dto = con.takeDeviceScreenshot(authToken, bookingDto.rid)
            Return con.downloadFileFromCloud(authToken, dto.filename, dto.dir)
        End Function

    End Class
End Namespace
