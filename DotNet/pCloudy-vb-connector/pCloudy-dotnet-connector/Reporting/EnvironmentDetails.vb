Imports System.Net

Public Class EnvironmentDetails
    
    Public Sub New()
        Me.addDetail("Execution started on", DateTime.Now)
        Me.addDetail("Eecuted From", Me.getHostName())
    End Sub

    Public getDetails As New Dictionary(Of String, String)

    Public Sub addDetail(item As String, value As String)
        If IsNothing(value) Then
            value = String.Empty
        End If

        If getDetails.ContainsKey(item) Then
            'just update the value
            getDetails(item) = value
        Else
            'add the value
            getDetails.Add(item, value)
        End If
    End Sub

    Private Function getHostName() As String
        Dim hostname As String = "-Unknown-"
        Try
            'hostname = Dns.GetHostName
            hostname = System.Environment.MachineName
        Catch ex As Exception
        End Try
        Return hostname
    End Function


End Class
