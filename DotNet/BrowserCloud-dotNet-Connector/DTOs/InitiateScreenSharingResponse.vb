Public Class InitiateScreenSharingResponse


    Public result As InitiateScreenSharingResponseResult

    Public Class InitiateScreenSharingResponseResult
        Public message As String
        Public instance_id As String
        Public messageType As String
        Public [error] As String

        Public mainRelayServer As String
        Public protocol As String
        Public url As String
        Public path As String
        Public viewOnlyPassword As String
        Public interactivePassword As String
        Public machineId As String
        Public system_os As String
        Public system_ver As String
        Public browser_name As String
        Public browser_ver As String
        Public browser_arch As String
        Public started_on As String

    End Class
End Class
