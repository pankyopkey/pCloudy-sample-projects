Public Class TestCase
    Private name As String
    Private lastStepAddedOn As Date = Now

    Private stepResultEntries As New List(Of IStepResultEntry)

    Public Sub New(name As String)
        Me.name = name
    End Sub



    Public Function getPassedStepsCount() As Integer
        Dim count As Integer = 0
        For Each stp In Me.getOnlyStepResults()


            If (stp.Result = ExecutionResult.Pass) Then
                count += 1
            End If
        Next
        Return count
    End Function

    Public Function getFailedStepsCount() As Integer
        Dim count As Integer = 0
        For Each stp In Me.getOnlyStepResults()


            If (stp.Result.Equals(ExecutionResult.Fail)) Then
                count += 1
            End If
        Next
        Return count
    End Function

    Public Function getNotExecutedStepsCount() As Integer
        Dim count As Integer = 0
        For Each stp In Me.getOnlyStepResults()


            If (stp.Result.Equals(ExecutionResult.NotExecuted)) Then
                count += 1
            End If
        Next
        Return count
    End Function

    Public Function getExecutionStatus() As ExecutionResult
        If (getOnlyStepResults().Count = 0) Then
            Return ExecutionResult.NotExecuted

            If (Me.getNotExecutedStepsCount() > 0) Then
                Return ExecutionResult.NotExecuted

                If (Me.getFailedStepsCount() > 0) Then
                    Return ExecutionResult.Fail
                End If
            End If
        End If
        Return ExecutionResult.Pass

    End Function

    Public Function getSteps() As List(Of IStepResultEntry)
        Return Me.stepResultEntries
    End Function

    Public Function getOnlyStepResults() As List(Of StepResult)
        Dim newCollection As List(Of StepResult) = New List(Of StepResult)
        For Each entry In stepResultEntries
            If (entry.type().Equals(IStepResultEntry.StepResultEntryType.StepResult)) Then
                newCollection.Add(entry)

            End If
        Next
        Return newCollection
    End Function

    Public Sub addComment(comment As String)
        Me.stepResultEntries.Add(New StepComment(comment))
    End Sub

    Public Sub addStep(action As String, parameters As String, output As String, result As ExecutionResult)
        Me.addStep(action, parameters, output, Nothing, result)
    End Sub

    Public Sub addStep(action As String, parameters As String, output As String, snapshotPath As String, result As ExecutionResult)

        Dim timeTaken As TimeSpan = Now - lastStepAddedOn

        Dim e As StepResult = New StepResult(Me.getOnlyStepResults().Count + 1, action, parameters, output, timeTaken, snapshotPath, result)
        Me.stepResultEntries.Add(e)

        lastStepAddedOn = Now
    End Sub

    Public Function getName() As String
        Return Me.name
    End Function

    Public Function getPassedStepsPercentage() As String
        Return Me.getPassedStepsCount() * 100 / Me.getOnlyStepResults().Capacity & "%"
    End Function

    Public Function getFailedStepsPercentage() As String
        Return Me.getFailedStepsCount() * 100 / Me.getOnlyStepResults().Capacity & "%"
    End Function

    Public Function durationInMinutes_Str() As String
        Return secondsToString(durationInSeconds())
    End Function

    Public Function durationInSeconds() As TimeSpan
        Dim durationInMilliseconds As TimeSpan
        Dim onlySteps As List(Of StepResult) = getOnlyStepResults()

        If (onlySteps.Capacity().Equals(0)) Then


            Dim lastStep As StepResult = onlySteps(onlySteps.Capacity - 1)
            Dim firstStep As StepResult = onlySteps(0)

            durationInMilliseconds = firstStep.TimeTakenInMilliseconds

        End If

        Return durationInMilliseconds
    End Function

    Private Function secondsToString(pTime As Long) As String
        Dim p = TimeSpan.FromSeconds(pTime)
        Return secondsToString(p)
    End Function

    Private Function secondsToString(p As TimeSpan) As String
        Return p.Minutes & ":" & p.Seconds
    End Function
    

End Class
