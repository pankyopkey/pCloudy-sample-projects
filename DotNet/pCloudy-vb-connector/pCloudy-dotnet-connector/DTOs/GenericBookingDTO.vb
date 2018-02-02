Namespace pCloudy.DTO.generic

    Public Class BookingDTO
        Public result As BookingDTOResult

    End Class

    Public Class BookingDTOResult
        Public [error] As String
        Public token As String
        Public rid As Integer

    End Class


    Public Class InstantAccessEndpoint
        Public Property result As InstantAccessEndpointResult

    End Class

    Public Class InstantAccessEndpointResult
        Public Property url As String
        Public Property [error] As String
    End Class

End Namespace
