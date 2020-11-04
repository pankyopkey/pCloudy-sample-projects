Public Class AvailableBrowsersResponse

    Public result As AvailableBrowsersResponseResult

    Public Class AvailableBrowsersResponseResult
        Public instances() As BrowserInstance
        Public [error] As String
    End Class

    Public Class BrowserInstance
        Public instance_id As String
        Public browsersDetails() As BrowserDetail
        Public [SystemOS] As SystemOSDetail
        Public mainRelayServer As String
        Public location As String
        Public ping As Integer = -1
        Public choosenRelayServer As String
        Public status As String
        Public supportedResolutions As String() = {}

        Public Overrides Function ToString() As String
            Return $"{SystemOS.OSName}{SystemOS.OSVersion} - {location} - {ping}ms"
        End Function


        Public Class BrowserDetail
            Public browserName As String
            Public browserVersion As String
            Public browserArchitecture As String

            Public Function getVersion() As Version
                Return New Version(browserVersion)
            End Function

            Public Overrides Function ToString() As String
                Return $"{browserName} v{browserVersion}"
            End Function

        End Class

        Public Class SystemOSDetail
            Public OSName As String
            Public OSVersion As String

        End Class
    End Class
End Class
