
Public Class HyperLinks

    Public getLinks As New Dictionary(Of String, String)


    Public Sub addLink(item As String, value As String)
        If IsNothing(value) Then
            value = String.Empty
        End If

        If getLinks.ContainsKey(item) Then
            'just update the value
            getLinks(item) = value
        Else
            'add the value
            getLinks.Add(item, value)
        End If
    End Sub
End Class