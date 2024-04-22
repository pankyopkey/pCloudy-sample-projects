Public Class BookBrowserResponse

    Public result As BookBrowserResponseResult

    Public Class BookBrowserResponseResult
        Public status As String
        Public code As Integer = -1
        Public [error] As String
    End Class

End Class
