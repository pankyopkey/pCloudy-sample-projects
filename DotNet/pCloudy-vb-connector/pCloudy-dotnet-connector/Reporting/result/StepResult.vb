Public Class StepResult
    Implements IStepResultEntry



    Public StepNumber As Integer
    Public Action As String
    Public Parameters As String = ""
    Public Output As String = ""
    Public TimeTakenInMilliseconds As TimeSpan
    Public ExecutedOn As Date
    Public SnapshotPath As String = ""
    Public Result As ExecutionResult = ExecutionResult.NotExecuted


    Public Sub New(stepNumber As Integer, action As String, parameters As String, output As String, timeTakenInMilleseconds As TimeSpan, snapshotPath As String, result As ExecutionResult)
        Me.StepNumber = stepNumber
        Me.Action = action
        If (parameters IsNot Nothing) Then
            Me.Parameters = parameters
        End If
        If (output IsNot Nothing) Then
            Me.Output = output
        End If
        If (snapshotPath IsNot Nothing) Then
            Me.SnapshotPath = snapshotPath
        End If

        Me.TimeTakenInMilliseconds = timeTakenInMilleseconds
        Me.ExecutedOn = Now
        Me.Result = result
    End Sub


    Public Function getText() As String Implements IStepResultEntry.getText
        Return Me.Action
    End Function


    Public Function type() As IStepResultEntry.StepResultEntryType Implements IStepResultEntry.type
        Return IStepResultEntry.StepResultEntryType.StepResult
    End Function


End Class
