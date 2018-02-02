Imports System.IO

Public Class SingleRunReport

    Public Header As String = "==Run Report=="
    Public Footer As String = Nothing

    Public ProjectLogo As String = "https://www.pcloudy.com/wp-content/uploads/2015/11/PCloudy_Logo_0-1.png"
    Public pCloudyLogo As String = "https://www.pcloudy.com/wp-content/uploads/2015/11/PCloudy_Logo_0-1.png"

    Private startedAt As Date = DateTime.Now
    Public Enviroment As EnvironmentDetails = New EnvironmentDetails()
    Public HyperLinks As HyperLinks = New HyperLinks()
    Public testcases As New List(Of TestCase)

    Public Function durationInSeconds() As String

        Dim duration As Integer = 0
        For Each tc In Me.testcases

        Next
        duration += durationInSeconds()

        Return secondsToString(duration)


    End Function

    Private Function secondsToString(pTime As Long) As String
        Dim p = TimeSpan.FromSeconds(pTime)
        Return secondsToString(p)
    End Function

    Private Function secondsToString(p As TimeSpan) As String
        Return p.Minutes & ":" & p.Seconds
    End Function

    Public Sub beginTestCase(name As String)
        testcases.Add(New TestCase(name))
    End Sub

    Public Sub addStep(action As String, parameters As String, output As String, Result As ExecutionResult)

        getCurrentTestCase().addStep(action, parameters, output, Result)

    End Sub


    Public Sub addStep(action As String, parameters As String, output As String, snapshotPath As String, Result As ExecutionResult)

        getCurrentTestCase().addStep(action, parameters, output, snapshotPath, Result)

    End Sub

    Public Sub addComment(comment As String)
        getCurrentTestCase().addComment(comment)
    End Sub

    Private Function getCurrentTestCase() As TestCase
        If (testcases.Count = 0) Then
            beginTestCase("TestCase1")
        End If
        Dim lastTestCase = testcases(testcases.Count - 1)
        Return lastTestCase


    End Function

    Public Function getPassedTestCasesCount() As Integer
        Dim count As Integer = 0
        For Each tcPass In Me.testcases
            If (tcPass.getExecutionStatus() = ExecutionResult.Pass) Then
                count += 1
            End If
        Next
        Return count

    End Function

    Public Function getFailedTestCasesCount() As Integer
        Dim count As Integer = 0
        For Each tcFail In Me.testcases
            If (tcFail.getExecutionStatus() = ExecutionResult.Fail) Then
                count += 1
            End If
        Next
        Return count

    End Function

    Public Function getNotExecutedTestCasesCount() As Integer
        Dim count As Integer = 0
        For Each tcNotExecuted In Me.testcases
            If (tcNotExecuted.getExecutionStatus() = ExecutionResult.NotExecuted) Then
                count += 1
            End If
        Next
        Return count

    End Function

    Public Function getExecutionStatus() As ExecutionResult
        If (testcases.Count = 0) Then
            Return ExecutionResult.NotExecuted
            If (getNotExecutedTestCasesCount() > 0) Then
                Return ExecutionResult.NotExecuted
                If (getFailedTestCasesCount() > 0) Then
                    Return ExecutionResult.Fail

                    Return ExecutionResult.Pass
                End If
            End If
        End If
    End Function

    Public Function getPassedStepsCount() As Integer
        Dim counter As Integer = 0
        For Each tc In Me.testcases
            counter += tc.getPassedStepsCount()
        Next
        Return counter
    End Function

    Public Function getFailedStepsCount() As Integer
        Dim counter As Integer = 0
        For Each tc In Me.testcases
            counter += tc.getFailedStepsCount()
        Next
        Return counter
    End Function

    Public Function getNotExecutedStepsCount() As Integer
        Dim counter As Integer = 0
        For Each tc In Me.testcases
            counter += tc.getNotExecutedStepsCount()
        Next
        Return counter
    End Function

    Public Function getTotalSteps() As Integer
        Dim counter As Integer = 0
        For Each tc In Me.testcases
            counter += tc.getOnlyStepResults().Count
        Next
        Return counter
    End Function

    Public Function getPassedStepsPercentage() As String
        Return Me.getPassedStepsCount() * 100 / Me.getTotalSteps() + "%"
    End Function

    Public Function getFailedStepsPercentage() As String
        Return Me.getFailedStepsCount() * 100 / Me.getTotalSteps() + "%"
    End Function

    Public Function getPassedTestCasesPercentage() As String
        Return Me.getPassedTestCasesCount() * 100 / Me.testcases.Count + "%"
    End Function

    Public Function getStartedAt() As Date
        Return Me.startedAt
    End Function
End Class
