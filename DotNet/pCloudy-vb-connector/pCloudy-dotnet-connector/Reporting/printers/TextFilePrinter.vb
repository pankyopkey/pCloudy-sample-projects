Imports System.IO

Public Class TextFilePrinter
    Implements IReportPrinter

    Dim outFile As FileInfo
    Private tab As String = "\t"
    Private columnSeparator As String = " : "

    Public Sub New(outFile As FileInfo)
        Me.outFile = outFile

    End Sub

    Public Sub printSingleRunReport(report As SingleRunReport) Implements IReportPrinter.printSingleRunReport
        Dim writer As IO.StreamWriter
        Try
            writer = New StreamWriter(outFile.FullName)

            writer.WriteLine("---------------------------------------------------------------------------------------")
            writer.WriteLine(report.ProjectLogo + tab + tab + tab + report.Header + tab + tab + tab + report.pCloudyLogo)
            writer.WriteLine("---------------------------------------------------------------------------------------")

            writer.WriteLine()
            writer.WriteLine()

            writer.WriteLine("Environment Details")
            writer.WriteLine("~~~~~~~~~~~~~~~~~~~")

            For Each env In report.Enviroment.getDetails
                writer.WriteLine(getPaddedString(env.Key, 40) + ":" + tab + env.Value)


                writer.Flush()
            Next
            If (report.HyperLinks.getLinks.Count > 0) Then
                writer.WriteLine()

                writer.WriteLine("Hyperlinks Details")
                writer.WriteLine("~~~~~~~~~~~~~~~~~~")
            End If

            For Each env In report.HyperLinks.getLinks




                writer.WriteLine(getPaddedString(env.Key, 40) + ":" + tab + env.Value)



                writer.WriteLine()

                writer.Flush()
            Next
            writer.WriteLine("Execution Steps")
            writer.WriteLine("~~~~~~~~~~~~~~~")

            writer.WriteLine()
            writer.WriteLine("-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")
            writer.WriteLine(columnSeparator + getPaddedString("#", 3) + columnSeparator + getPaddedString("Action", 35) + columnSeparator + getPaddedString("Parameters", 35) + columnSeparator + getPaddedString("Output", 35) + columnSeparator + getPaddedString("Seconds", 7) + columnSeparator + getPaddedString("ExecutedOn", 10) + columnSeparator + getPaddedString("Snapshot", 21) + columnSeparator + getPaddedString("Result", 6) + columnSeparator)
            writer.WriteLine(
                    "-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")

            writer.Flush()

            For Each testcase In report.testcases


                writer.WriteLine(testcase.getName + columnSeparator + testcase.getExecutionStatus().ToString)
                For Each stepEntry In testcase.getSteps
                    If (stepEntry.type = IStepResultEntry.StepResultEntryType.StepResult) Then
                        Dim stp As StepResult = stepEntry

                        If (stp.SnapshotPath IsNot Nothing And stp.SnapshotPath IsNot Nothing) Then
                            Dim snapShotFile As FileInfo = New FileInfo(stp.SnapshotPath)
                            Dim snapshotName As String = snapShotFile.DirectoryName
                            writer.WriteLine(columnSeparator + getPaddedString(stp.StepNumber + "", 3) + columnSeparator + getPaddedString(stp.Action, 35) + columnSeparator + getPaddedString(stp.Parameters, 35) + columnSeparator + getPaddedString(stp.Output, 35) + columnSeparator + getPaddedString(stp.TimeTakenInMilliseconds.TotalSeconds + " s", 7) + columnSeparator + getPaddedString(String.Format("{dd/MM/yyyy}"), 10) + columnSeparator + getPaddedString(snapshotName, 21) + columnSeparator + getPaddedString(stp.Result, 6) + columnSeparator)
                        ElseIf (stepEntry.type = IStepResultEntry.StepResultEntryType.Comment) Then
                            writer.WriteLine("// " + stepEntry.getText())
                        End If

                    End If
                Next
            Next
            writer.WriteLine("-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------")

            writer.Close()
        Catch ex As Exception


        End Try

    End Sub


    Private Function getPaddedString(original As String, length As Integer) As String
        If (original.Equals(Nothing)) Then
            original = ""
            If (original.Length() > length) Then
                original = original.Substring(0, length)
            End If
            Return String.Format("%1$-" + length + "s", original)
        End If
    End Function

    Public Sub printConsolidatedSingleRunReport(multipleReports As MultipleRunReport) Implements IReportPrinter.printConsolidatedSingleRunReport
        Throw New NotImplementedException()
    End Sub




End Class
