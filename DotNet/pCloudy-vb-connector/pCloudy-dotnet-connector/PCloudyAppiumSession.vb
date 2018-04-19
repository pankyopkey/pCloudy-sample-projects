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

        Public Overrides Function ToString() As String
            Return Me.getDeviceName()
        End Function


        Public Function getDeviceName() As String
            Dim platform = "Android"
            If (bookingDto.os.ToLower = "ios") Then platform = "iOS"

            Dim model = bookingDto.model.Replace(" ", "")

            Return String.Format("{0}_{1}_{2}_{3}", bookingDto.manufacturer, model, platform, bookingDto.version)
        End Function
    End Class
End Namespace
