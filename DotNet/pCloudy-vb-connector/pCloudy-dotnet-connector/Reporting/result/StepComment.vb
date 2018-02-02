Public Class StepComment
    Implements IStepResultEntry


    Private comment As String = ""

    Sub New(comment As String)
         Me.comment = comment
    End Sub

   
	
    Public Function getText() As String Implements IStepResultEntry.getText
        Return Me.comment
    End Function


    Public Function type() As IStepResultEntry.StepResultEntryType Implements IStepResultEntry.type
        Return IStepResultEntry.StepResultEntryType.Comment
    End Function


End Class
