Public Class MultipleRunReport
    Inherits ArrayList

    Private serialVersionUID As Long = -7240092311990131362L
    Public ProjectLogo As String = "https://www.pcloudy.com/wp-content/uploads/2015/11/PCloudy_Logo_0-1.png"
    Public Header As String = "Consolidated Report"
    Public pCloudyLogo As String = "https://www.pcloudy.com/wp-content/uploads/2015/11/PCloudy_Logo_0-1.png"
    Dim report As SingleRunReport

    Public Function getPassedRunsCount() As Integer
        Return getRunCount(ExecutionResult.Pass)
    End Function

    Public Function getFailedRunsCount() As Integer
        Return getRunCount(ExecutionResult.Fail)
    End Function

    Public Function getNotExecutedRunsCount() As Integer
        Return getRunCount(ExecutionResult.NotExecuted)
    End Function

    Private Function getRunCount(expectedResult As ExecutionResult) As Integer
        Dim count As Integer = 0
        For Each report In Me
        Next
        If (report.getExecutionStatus().Equals(expectedResult)) Then
            count += 1
        End If
        Return count
    End Function


End Class
