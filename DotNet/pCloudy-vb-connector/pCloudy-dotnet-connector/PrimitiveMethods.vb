Namespace pCloudy

    Public Class PrimitiveMethods

        Private _connector As pCloudyClient = Nothing

        Public Sub New(endpoint As String)
            _connector = New pCloudyClient(endpoint)
        End Sub

        Public Function AuthenticateUser(username As String, apiKey As String) As String
            Return _connector.authenticateUser(username, apiKey)
        End Function

        Public Function getAvailabledevices(authToken As String, durationInMinutes As Integer, platform As String) As ArrayList
            Return New ArrayList((From itm In _connector.getAvailableDevices(authToken, durationInMinutes, platform, True) Select itm.full_name).ToArray)
        End Function

        Public Function stringArray() As ArrayList
            Return New ArrayList({"str1", "str2", "str3"})
        End Function

        Public Function objectArray() As ArrayList
            Return New ArrayList({"obj1", "obj2", "obj3"})
        End Function

        Public Function BookADevice(authToken As String, durationInMinutes As Integer, platform As String, deviceFullName As String) As Integer
            Dim deviceDto = (From itm In _connector.getAvailableDevices(authToken, durationInMinutes, platform, True) Where itm.full_name = deviceFullName).SingleOrDefault
            If IsNothing(deviceDto) Then Throw New Exception("Device was not found")


            Dim bookingDto = _connector.bookDevice(authToken, TimeSpan.FromMinutes(durationInMinutes), CInt(deviceDto.id))

            Return bookingDto.rid
        End Function

        Public Function getDevicePageURL(authToken As String, rid As Integer) As String
            Dim bookingDto = Me.getBookingDto(rid)
            Return _connector.getDevicePageURL(authToken, bookingDto).ToString
        End Function

        Private Function getBookingDto(rid As Integer) As DTO.generic.BookingDTOResult
            Dim bookingDto = New DTO.generic.BookingDTOResult
            bookingDto.rid = rid
            Return bookingDto
        End Function

        Public Function startAdbBridge(userName As String, authToken As String, rid As Integer) As String
            Dim bookingDto = Me.getBookingDto(rid)
            Return _connector.startAdbBridge(userName, authToken, bookingDto)
        End Function

        Public Sub showInLiveView(authToken As String, rid As Integer, cycleName As String)
            _connector.showInLiveView(authToken, {Me.getBookingDto(rid)}, cycleName)
        End Sub

        Public Function executeAdbCommand(authToken As String, rid As Integer, adbCommand As String) As String
            Return _connector.executeAdbCommand(authToken, Me.getBookingDto(rid), adbCommand)
        End Function

        Public Sub releaseDevice(authToken As String, rid As Integer)
            _connector.releaseInstantAccessBooking(authToken, rid)
        End Sub
    End Class
End Namespace