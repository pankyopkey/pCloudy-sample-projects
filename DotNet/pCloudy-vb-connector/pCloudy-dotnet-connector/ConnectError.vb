Imports Microsoft.VisualBasic

Public Class ConnectError
    Inherits Exception

    Sub New(errorMessage As String)
        MyBase.New(errorMessage)
    End Sub

End Class
