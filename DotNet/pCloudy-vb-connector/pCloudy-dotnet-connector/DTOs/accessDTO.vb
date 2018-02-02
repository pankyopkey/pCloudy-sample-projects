Namespace pCloudy.DTO

    Public Class pCloudyResponseDTO
        Public Property result As pCloudyResponseDtoResult

    End Class

    Public Class pCloudyResponseDtoResult
        Public Property token As String
        Public Property code As Integer

        Public Property [error] As String

    End Class



    Public Class UserDetailDTO
        Public Property result As UserDetailResultDTO

    End Class

    Public Class UserDetailResultDTO
        Public Property token As String
        Public Property code As Integer

        Public Property [error] As String


        Public uid As Integer
        Public Name As String
        Public Email As String
        Public Phone As String
        Public IsAdmin As Boolean
        Public Plan As String
        Public MinuteBalance As Integer = 0

        Public Function geBalanceMinutes() As TimeSpan
            Return TimeSpan.FromMinutes(MinuteBalance)
        End Function

    End Class



End Namespace
