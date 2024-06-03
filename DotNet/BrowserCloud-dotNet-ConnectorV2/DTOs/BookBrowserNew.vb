Public Class ApiResponse
    Public Property result As ApiResult
    Public Property StatusCode As Integer

    Public Class ApiResult
        Public Property message As String
        Public Property data As ApiData
        Public Property [error] As String
    End Class

    Public Class ApiData
        Public Property trialUser As Boolean
        Public Property bookingDetails As List(Of BookingDetail)
    End Class

    Public Class BookingDetail
        Public Property os As String
        Public Property os_ver As String
        Public Property browser As String
        Public Property browser_ver As String
        Public Property booking_id As String
        Public Property start_time As Long?
        Public Property end_time As Long?
    End Class
End Class
