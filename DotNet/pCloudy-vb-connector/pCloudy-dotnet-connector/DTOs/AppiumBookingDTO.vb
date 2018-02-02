Namespace pCloudy.DTO.appium

    Public Class BookingDTO
        '{
        '    "token": "TOKEN",
        '    "code": 200,
        '    "device_ids": [{
        '        "manufacturer": "Htc",
        '        "model": "WildfireS",
        '        "os": "android",
        '        "version": "2.3.5",
        '        "capabilities": {
        '            "platformName": "Android",
        '            "browserName": 13,
        '            "deviceName": 13
        '        },
        '        "phoneNumber": "",
        '        "operatorName": "",
        '        "networkType": ""
        '    }]
        '}

        Public Property result As bookingDtoResult

    End Class

    Public Class bookingDtoResult
        Public Property [error] As String
        Public Property device_ids As BookingDtoDevice()

    End Class

    Public Class BookingDtoDevice
        Public Property manufacturer As String
        Public Property model As String
        Public Property os As String
        Public Property version As String
        Public Property capabilities As BookingDtoDeviceCapability
        Public Property PhoneNumber As String
        Public Property operatorName As String
        Public Property NetworkType As String
        Public Property rid As Integer

    End Class

    Public Class BookingDtoDeviceCapability

        Public Property platformName As String
        Public Property browserName As String
        Public Property deviceName As String

    End Class
End Namespace