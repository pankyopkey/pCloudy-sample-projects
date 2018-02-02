Imports System.IO

Public Class HtmlFilePrinter
    Implements IReportPrinter

    Dim outFile As FileInfo

    Public Sub New(outFile As FileInfo)
        Me.outFile = outFile
    End Sub

    Private Function secondsToString(pTime As Long) As String
        Dim p = TimeSpan.FromSeconds(pTime)
        Return secondsToString(p)
    End Function

    Private Function secondsToString(p As TimeSpan) As String
        Return p.Minutes & ":" & p.Seconds
    End Function

    Public Sub printSingleRunReport(report As SingleRunReport) Implements IReportPrinter.printSingleRunReport
        report.Enviroment.addDetail("Total Time Elapsed", Me.secondsToString(Now - report.getStartedAt))
        Using writer As New StreamWriter(outFile.FullName)

            writer.WriteLine("<html>")

            writer.WriteLine("<head><title>" + report.Header + "</title>")

            writer.WriteLine("<style>")
            writer.WriteLine("body {background-color:white; font-family:Verdana, Geneva, sans-serif;}")
            writer.WriteLine("h1   {color:#004380;}")
            writer.WriteLine("h2   {color:#005199;background-color: #cce7ff;width: 98%; padding: 6px 6px 6px 10px; margin-bottom: 10px;}")

            writer.WriteLine(".environmentDetails tr:nth-of-type(odd) {background-color:#f1f1f1; font-family:'Comic Sans MS', cursive, sans-serif;}")
            writer.WriteLine(".environmentDetails tr:nth-of-type(even) {background-color:#ddeeff; font-family:'Comic Sans MS', cursive, sans-serif;}")
            writer.WriteLine(".environmentDetails td {padding: 3px;text-align: left;}")

            writer.WriteLine(".executionSteps tr:nth-of-type(odd) {")
            writer.WriteLine("    background-color:#f1f1f1;")
            writer.WriteLine("}")
            writer.WriteLine(".executionSteps tr:nth-of-type(even) {")
            writer.WriteLine("    background-color:#fff;")
            writer.WriteLine("}")
            writer.WriteLine(".executionSteps th, .executionSteps td {padding: 5px;text-align: left;}")

            writer.WriteLine(".pass { background-color:#8ed576; color:White; text-align: center;}")
            writer.WriteLine(".fail { background-color:#ffaa90; color:Red; text-align: center;}")
            writer.WriteLine(".notExecuted { background-color:#ffff66; text-align: center;}")

            writer.WriteLine(".comment { background-color:#adebad; color:#248f24; font-size:80%;}")
            writer.WriteLine(".testcase { background-color:#b3ccff; color:#000099; font-size:130%;}")
            writer.WriteLine(".executionSteps td { white-space:pre;")
            writer.WriteLine("max-width: 100px;")
            writer.WriteLine("overflow: hidden;")
            writer.WriteLine("text-overflow: ellipsis;")
            writer.WriteLine("white-space: nowrap;}")

            writer.WriteLine("table.accordion {")
            writer.WriteLine("background-color: #7EC8C8;")
            writer.WriteLine("cursor: pointer;")
            writer.WriteLine("padding: 10px;")
            writer.WriteLine("width: 98%;")
            writer.WriteLine("border: 5px solid white;")
            writer.WriteLine("outline: none;")
            writer.WriteLine("font-size: 20px;")
            writer.WriteLine("transition: 0.4s;")
            writer.WriteLine("}")

            writer.WriteLine("table.accordion.active, table.accordion:hover {")
            writer.WriteLine("background-color: #3E8EB3;")
            writer.WriteLine("}")

            writer.WriteLine("div.panel {")
            writer.WriteLine("padding: 0 18px;")
            writer.WriteLine("display: none;")
            writer.WriteLine("background-color: white;")
            writer.WriteLine("}")

            writer.WriteLine("div.panel.show {")
            writer.WriteLine("display: block !important;")
            writer.WriteLine("}")

            writer.WriteLine("table#t01{")
            writer.WriteLine("padding:40px;")
            writer.WriteLine("}")

            writer.WriteLine("button.accordion {")
            writer.WriteLine("background-color: #cce7ff;")
            writer.WriteLine("color: #005199;")
            writer.WriteLine("cursor: pointer;")
            writer.WriteLine("padding: 10px;")
            writer.WriteLine("width: 100%;")
            writer.WriteLine("border: none;")
            writer.WriteLine("text-align: left;")
            writer.WriteLine("outline: none;")
            writer.WriteLine("font-size: 20px;")
            writer.WriteLine("transition: 0.4s;")
            writer.WriteLine("}")

            writer.WriteLine("button.accordion.active, button.accordion:hover {")
            writer.WriteLine("background-color: #ddd;")
            writer.WriteLine("}")

            writer.WriteLine("button {")
            writer.WriteLine("     background:none!important;")
            writer.WriteLine("     border:none; ")
            writer.WriteLine("     color: #005199;")
            writer.WriteLine("     padding:0!important;")
            writer.WriteLine("     font: inherit;")
            writer.WriteLine("}")

            ' CSS for Snapshot Popup http://stackoverflow.com/questions/19064987/html-css-popup-div-on-text-click
            writer.WriteLine(".white_content_popup {")
            writer.WriteLine("    display: none;")
            writer.WriteLine("    margin: auto;")
            writer.WriteLine("    position: absolute;")
            writer.WriteLine("    width: 50%;")
            writer.WriteLine("    height: 75%;")
            writer.WriteLine("    padding: 16px;")
            writer.WriteLine("    border: 16px light blue;")
            writer.WriteLine("    background-color: white;")
            writer.WriteLine("    z-index:1002;")
            writer.WriteLine("    overflow: auto;")
            writer.WriteLine("}")

            writer.WriteLine("pre {")
            writer.WriteLine("    white-space: pre-wrap;       /* Since CSS 2.1 */")
            writer.WriteLine("    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */")
            writer.WriteLine("    white-space: -pre-wrap;      /* Opera 4-6 */")
            writer.WriteLine("    white-space: -o-pre-wrap;    /* Opera 7 */")
            writer.WriteLine("    word-wrap: break-word;       /* Internet Explorer 5.5+ */")
            writer.WriteLine("}")


            writer.WriteLine("#customPopup")
            writer.WriteLine("{")
            writer.WriteLine(" width:50vw;")
            writer.WriteLine(" height:60vh;")
            writer.WriteLine(" z-index:11111;")
            writer.WriteLine(" position:fixed;")
            writer.WriteLine(" left: 25vw;")
            writer.WriteLine(" top: 25vh;")
            writer.WriteLine("}")

            writer.WriteLine(".hide {")
            writer.WriteLine(" display:none;")
            writer.WriteLine("}")

            writer.WriteLine(".popup-cover{")
            writer.WriteLine(" position:fixed;")
            writer.WriteLine(" top:0;")
            writer.WriteLine(" left:0;")
            writer.WriteLine(" width:100%;")
            writer.WriteLine(" height:100%;")
            writer.WriteLine(" z-index:100;")
            writer.WriteLine(" background-color:rgba(0,0,0,0.4);")
            writer.WriteLine("}")

            writer.WriteLine(".customImageContainer{")
            writer.WriteLine("width:100%;")
            writer.WriteLine("height:100%;")
            writer.WriteLine("padding:20px;")
            writer.WriteLine("background-color:#fafafa;")
            writer.WriteLine("overflow:auto;")
            writer.WriteLine("}")

            writer.WriteLine(".customImage{")
            writer.WriteLine("user-select: none;")
            writer.WriteLine("max-width:100%;")
            writer.WriteLine("margin-left: auto;")
            writer.WriteLine("margin-right: auto;")
            writer.WriteLine("display: block;")
            writer.WriteLine("max-height:100%;")
            writer.WriteLine("background-color:#fafafa;")
            writer.WriteLine("border:0;")
            writer.WriteLine("}")

            writer.WriteLine(".customImage.zoomed{")
            writer.WriteLine("margin-left: auto;")
            writer.WriteLine("margin-right: auto;")
            writer.WriteLine("display: block;")
            writer.WriteLine("}")

            writer.WriteLine(".close{")
            writer.WriteLine("position:absolute;")
            writer.WriteLine("right:15px;")
            writer.WriteLine("top:15px;")
            writer.WriteLine("z-index:111111;")
            writer.WriteLine("width: 30px;")
            writer.WriteLine("height: 30px;")
            writer.WriteLine("background-color: #2060B1;")
            writer.WriteLine("border-radius: 50%;")
            writer.WriteLine("}")

            writer.WriteLine(".close > i{")
            writer.WriteLine("color:#fff;")
            writer.WriteLine("text-align: center;")
            writer.WriteLine("width: 100%;")
            writer.WriteLine("height: 100%;")
            writer.WriteLine("line-height: 1.8em;")
            writer.WriteLine("}")

            writer.WriteLine(".close:hover{")
            writer.WriteLine("background-color: #003374;")
            writer.WriteLine("}")

            writer.WriteLine(".zoomed{")
            writer.WriteLine("transform:scale(2);")
            writer.WriteLine("transform-origin: left top;")
            writer.WriteLine("}")

            writer.WriteLine(".msg-for-user{")
            writer.WriteLine("text-align: center;")
            writer.WriteLine("background-color: #fff;")
            writer.WriteLine("font-weight: bold;")
            writer.WriteLine("font-size: 1.5em;")
            writer.WriteLine("margin: 0;")
            writer.WriteLine("padding: 20px;")
            writer.WriteLine("}")



            writer.WriteLine("</style>")

            writer.WriteLine("<script src='https://code.jquery.com/jquery-1.10.2.js'></script>")

            writer.WriteLine("<script type='text/javascript' src='https://www.google.com/jsapi'></script>")
            writer.WriteLine("<script type='text/javascript'>")
            writer.WriteLine("  google.load('visualization', '1', {packages:['corechart']});")
            writer.WriteLine("  google.setOnLoadCallback(drawTestCaseChart);")
            writer.WriteLine("  google.setOnLoadCallback(drawStepsChart);")

            writer.WriteLine("  function drawTestCaseChart() {")
            writer.WriteLine("")
            writer.WriteLine("    var data = google.visualization.arrayToDataTable([")
            writer.WriteLine("      ['Status', 'Number of steps'],")
            writer.WriteLine("      ['Passed Test Cases',     " & report.getPassedTestCasesCount() & "],")
            writer.WriteLine("      ['Failed Test Cases',     " & report.getFailedTestCasesCount() & "],")
            writer.WriteLine("      ['NotExecuted Test Cases',  " & report.getNotExecutedTestCasesCount() & "],")
            writer.WriteLine("    ]);")
            writer.WriteLine("")
            writer.WriteLine("    var options = {")
            writer.WriteLine("      title: 'TestCases Summary',")
            writer.WriteLine("      is3D: true,")

            writer.WriteLine("      slices: {")
            writer.WriteLine("          0: { color: 'Green' },")
            writer.WriteLine("          1: { color: 'Red' },")
            writer.WriteLine("          2: { color: 'Yellow' }")
            writer.WriteLine("        }")
            writer.WriteLine("    };")
            writer.WriteLine("")
            writer.WriteLine("    var chart = new google.visualization.PieChart(document.getElementById('testCasesPieChart'));")
            writer.WriteLine("")
            writer.WriteLine("    chart.draw(data, options);")
            writer.WriteLine("  }")

            writer.WriteLine("  function drawStepsChart() {")
            writer.WriteLine("")
            writer.WriteLine("    var data = google.visualization.arrayToDataTable([")
            writer.WriteLine("      ['Status', 'Number of steps'],")
            writer.WriteLine("      ['Passed Steps',     " & report.getPassedStepsCount() & "],")
            writer.WriteLine("      ['Failed Steps',     " & report.getFailedStepsCount() & "],")
            writer.WriteLine("      ['NotExecuted Steps',  " & report.getNotExecutedStepsCount() & "],")
            writer.WriteLine("    ]);")
            writer.WriteLine("")
            writer.WriteLine("    var options = {")
            writer.WriteLine("      title: 'Steps Summary',")
            writer.WriteLine("      is3D: true,")

            writer.WriteLine("      slices: {")
            writer.WriteLine("          0: { color: 'Green' },")
            writer.WriteLine("          1: { color: 'Red' },")
            writer.WriteLine("          2: { color: 'Yellow' }")
            writer.WriteLine("        }")
            writer.WriteLine("    };")
            writer.WriteLine("")
            writer.WriteLine("    var chart = new google.visualization.PieChart(document.getElementById('stepsPieChart'));")
            writer.WriteLine("")
            writer.WriteLine("    chart.draw(data, options);")
            writer.WriteLine("  }")
            writer.WriteLine("</script>")

            ' show popup screenshot
            writer.WriteLine("<script type='text/javascript'>")
            writer.WriteLine("function showIt(imgsrc) {")
            writer.WriteLine("debugger;")
            writer.WriteLine(" $('#customPopup').removeClass('hide'); ")
            writer.WriteLine(" $('.popup-cover').removeClass('hide');")
            writer.WriteLine(" $('.customImage').attr('src',imgsrc);")
            writer.WriteLine("}")
            writer.WriteLine("</script>")

            writer.WriteLine("<script>")
            writer.WriteLine("$(document).keydown(function(e) {")
            writer.WriteLine("if (e.keyCode == 27) {")
            writer.WriteLine("if($('#customPopup').hasClass('hide') === false){")
            writer.WriteLine("$('#customPopup').addClass('hide');")
            writer.WriteLine("$('.popup-cover').addClass('hide');")
            writer.WriteLine("$('.customImage').removeClass( 'zoomed' );")
            writer.WriteLine("}")
            writer.WriteLine("}")
            writer.WriteLine("});")

            writer.WriteLine("$(document).ready(function(){")
            writer.WriteLine("$('.close').on('click', function(){")
            writer.WriteLine("$('#customPopup').addClass('hide');")
            writer.WriteLine("$('.customImage').removeClass( 'zoomed' );")
            writer.WriteLine("$('.popup-cover').addClass('hide');")
            writer.WriteLine("});")

            writer.WriteLine("$('.customImage').on('click', function() {")
            writer.WriteLine("$(this).toggleClass( 'zoomed' );")
            writer.WriteLine("if($('.customImage').hasClass('zoomed') === true){")
            writer.WriteLine("$('.customImage').css('cursor', 'zoom-out');")
            writer.WriteLine("}")
            writer.WriteLine("else{")
            writer.WriteLine("$('.customImage').css('cursor', 'zoom-in');")
            writer.WriteLine("}")
            writer.WriteLine("});")

            writer.WriteLine("$('.customImage').hover(function() {")
            writer.WriteLine("if($('.customImage').hasClass('zoomed') === true){")
            writer.WriteLine("$('.customImage').css('cursor', 'zoom-out');")
            writer.WriteLine("}")
            writer.WriteLine("else{")
            writer.WriteLine("$('.customImage').css('cursor', 'zoom-in');")
            writer.WriteLine("}")
            writer.WriteLine("});")
            writer.WriteLine("});")
            writer.WriteLine("</script>")

            writer.WriteLine("</head>")

            writer.WriteLine("<body>")

            writer.WriteLine("<table width=100%><tr>")
            writer.WriteLine("<td>" + "<img src=" + report.ProjectLogo + " alt='" + report.ProjectLogo + "' height='75px'>" + "</td> " + "<td width=70%><center><h1>" + "Report on " +
                             report.Header.Replace("_", " ") + "</h1></center></td>" + "<td>" + "<img src=" + report.pCloudyLogo + " alt='" + report.pCloudyLogo + "' height='75px'>" + "</td>")
            writer.WriteLine("</tr></table>")

            writer.WriteLine("<hr/>")

            writer.WriteLine("<h2><u>Environment Details</u></h2>")

            writer.WriteLine("<table width='100%' border=0><tr><td rowspan=2 align='center'>")

            writer.WriteLine("<table class='environmentDetails' width=100% border=0align='left'>")
            For Each env In report.Enviroment.getDetails
                writer.WriteLine("<tr><td>" + env.Key + "</td><td>" + env.Value + "</td></tr>")
            Next



            writer.WriteLine("</table></td>")

            writer.WriteLine("<td rowspan=2 align='right'><div id='testCasesPieChart' style='width: 400px; height: 300px;'></div>" + "</td>")
            writer.WriteLine("<td height='30%'></td>")
            writer.WriteLine("</tr><tr>")
            writer.WriteLine("<td align='left'><div id='stepsPieChart' style='width: 350px; height: 200px;'></div>" + "</td>")

            writer.WriteLine("</tr></table>")

            If (report.HyperLinks.getLinks.Count) > 0 Then
                writer.WriteLine("</br>")
                writer.WriteLine("</br>")

                writer.WriteLine("<h2><u>Hyperlinks Details</u></h2>")

                writer.WriteLine("<table class='hyperlinkDetails' width=50% align=center>")
            End If
            For Each env In report.HyperLinks.getLinks
                writer.WriteLine("<tr><td>" + env.Key + "</td><td><a href='" + env.Value + "'>" + env.Value + "</a></td></tr>")
            Next


            writer.WriteLine("</table>")



            writer.WriteLine("<hr/>")
            writer.WriteLine("<h2><u>Execution Details</u></h2>")

            writer.WriteLine("<table align='center' cellpadding='10'><tr><td>")
            writer.WriteLine("<button id='expand_all_testcases'>Expand All</button>")
            writer.WriteLine("</td><td>")
            writer.WriteLine("<button id='toggle_all_testcases'>Toggle</button>")
            writer.WriteLine("</td><td>")
            writer.WriteLine("<button id='collapse_all_testcases'>Collapse All</button>")
            writer.WriteLine("</td></tr><table>")

            For Each testCase In report.testcases


                Dim testCaseResultHtml As String = "<td class='" + testCase.getExecutionStatus().ToString.ToLower() + "'>" + testCase.getExecutionStatus().ToString + " </td> "

                Dim testCaseResultBar = "<table border='0' width='90%' height='28px'><tr>"
                If (testCase.getPassedStepsCount() > 0) Then
                    testCaseResultBar += "<td title='" + testCase.getPassedStepsPercentage() + "' bgcolor='green' width=" + testCase.getPassedStepsPercentage() + "></td>"
                    If (testCase.getFailedStepsCount() > 0) Then
                        testCaseResultBar += "<td title='" + testCase.getFailedStepsPercentage() + "' bgcolor='red' width='" + testCase.getFailedStepsPercentage() + "'></td>"
                        testCaseResultBar += "</tr></table>"
                    End If
                    writer.WriteLine("<table class='accordion' align='center' cellpadding='2' border='0' bordercolor='white'><tr>" + "<td width='60%' align='left'>" + testCase.getName() + "</td>" +
                                     "<td width='10%' align='center'>" + testCase.durationInMinutes_Str() + "<td width='20%' align='center'>" + testCaseResultBar + "</td>" + testCaseResultHtml)
                End If
                writer.WriteLine("<div id='foo' class='panel'>")

                writer.WriteLine("<table class='executionSteps' width=95% align=center border=0>")
                writer.WriteLine("<tr>" + "<th> # </th> " + "<th width=35%> Action </th> " + "<th width=35%> Parameters </th> " + "<th width=30%> Output </th> " + "<th width=100px> Seconds </th> " + "<th width=200px> ExecutedOn </th>" + "<th width=200px> Snapshot </th>" + "<th width=150px> Result </th> " + "</tr>")

                For Each stepEntry In testCase.getSteps()

                    If (stepEntry.type = IStepResultEntry.StepResultEntryType.StepResult) Then

                        Dim stp As StepResult = stepEntry

                        Dim snapshotName As String = ""

                        If (Not String.IsNullOrWhiteSpace(stp.SnapshotPath)) Then
                            Dim snapShotFile = New FileInfo(stp.SnapshotPath)


                            snapshotName = "<a target='_blank' href='./" + snapShotFile.Directory.Name + "/" + snapShotFile.Name + "'" + " onmouseover='showIt(this.href)'" + ">" + snapShotFile.Name + "</a>"


                            writer.WriteLine("<div class='popup-cover hide'>")
                            writer.WriteLine("<p class='msg-for-user'>Press Esc Key to close this window</p>")
                            writer.WriteLine("</div>")
                            writer.WriteLine("<div id='customPopup' class='hide'>")
                            writer.WriteLine("<div class='customImageContainer'>")
                            writer.WriteLine("<img class='customImage' src='./" + snapShotFile.Directory.Name + "/" + snapShotFile.Name + "'>")

                        End If

                        Dim stepResultHtml As String = "<td class='" + stp.Result.ToString + "'>" + stp.Result.ToString + " </td> "

                        writer.WriteLine("<tr>" + "" + "<td>" & stp.StepNumber & " </td> " + "<td>" + stp.Action + "  </td> " + "<td>" + stp.Parameters + "  </td> " + "<td title='" + stp.Output + "'>" + toHtml(stp.Output) + "  </td> " + "<td>" & stp.TimeTakenInMilliseconds.TotalSeconds & " s" + "  </td> " + "<td>" & (String.Format("dd/MM/yyyy", DateTime.Now)) & " </td>" + "<td>" + snapshotName + " </td>" + stepResultHtml + "</tr>")

                    ElseIf (stepEntry.type() = IStepResultEntry.StepResultEntryType.Comment) Then
                        writer.WriteLine("<tr>" + "<td colspan='8' class='comment'>" + toHtml(stepEntry.getText()) + "</td></tr>")

                    End If
                Next
                writer.WriteLine("</div>")
                writer.WriteLine("</table>")

                writer.WriteLine("</div>")

                writer.WriteLine("</div>")
                writer.WriteLine("</div>")

            Next
            writer.WriteLine("</div>")

            writer.WriteLine("<hr/>")

            writer.WriteLine("<script>")
            writer.WriteLine("var acc = document.getElementsByClassName('accordion');")
            writer.WriteLine("var i;")
            writer.WriteLine("for (i = 0; i < acc.length; i++) {")
            writer.WriteLine("  acc[i].onclick = function(){")
            writer.WriteLine("       this.classList.toggle('active');")
            writer.WriteLine("       this.nextElementSibling.classList.toggle('show');")
            writer.WriteLine("  }")
            writer.WriteLine("}")
            writer.WriteLine("</script>")

            writer.WriteLine("<script>")
            writer.WriteLine("$(function(){")

            writer.WriteLine("$('#collapse_all_testcases').click(function(){")
            writer.WriteLine("var acc = document.getElementsByClassName('accordion');")
            writer.WriteLine("var i;")
            writer.WriteLine("for (i = 0; i < acc.length; i++) {")
            writer.WriteLine("    acc[i].classList.toggle('active', false);")
            writer.WriteLine("    acc[i].nextElementSibling.classList.toggle('show', false);")
            writer.WriteLine("}")
            writer.WriteLine("});")

            writer.WriteLine("$('#toggle_all_testcases').click(function(){")
            writer.WriteLine("var acc = document.getElementsByClassName('accordion');")
            writer.WriteLine("var i;")
            writer.WriteLine("for (i = 0; i < acc.length; i++) {")
            writer.WriteLine("    acc[i].classList.toggle('active');")
            writer.WriteLine("    acc[i].nextElementSibling.classList.toggle('show');")
            writer.WriteLine("}")
            writer.WriteLine("});")

            writer.WriteLine("$('#expand_all_testcases').click(function(){")
            writer.WriteLine("var acc = document.getElementsByClassName('accordion');")
            writer.WriteLine("var i;")
            writer.WriteLine("for (i = 0; i < acc.length; i++) {")
            writer.WriteLine("    acc[i].classList.toggle('active', true);")
            writer.WriteLine("    acc[i].nextElementSibling.classList.toggle('show', true);")
            writer.WriteLine("}")
            writer.WriteLine("});")

            writer.WriteLine("});")
            writer.WriteLine("</script>")

            writer.WriteLine("</br>")

            writer.WriteLine("</div>")
            writer.WriteLine("</div")

            writer.WriteLine("</body>")
            writer.WriteLine("<footer><center>")

            If (report.Footer IsNot Nothing) Then

                writer.WriteLine("</br>")

                writer.WriteLine("<p>Report Powered by: pCloudy @ SSTS Inc. US.</p>")
                writer.WriteLine("<p>pCloudy™ is a registered trademark. Copyright Laws Apply. pCloudy is owned by Smart Software Testing Solutions Inc. US.</p>")
                writer.WriteLine("<a href='https://www.pcloudy.com'>https://www.pcloudy.com</a></p>")
                writer.WriteLine("</center></footer>")
                writer.WriteLine("<hr/>")

                writer.WriteLine("</html>")
            End If
        End Using
    End Sub



    Public Sub printConsolidatedSingleRunReport(multipleReports As MultipleRunReport) Implements IReportPrinter.printConsolidatedSingleRunReport
        Using writer = New StreamWriter(outFile.FullName)

            writer.WriteLine("<html>")
            writer.WriteLine("<head><title>" + "Consolidated Report" + "</title>")
            writer.WriteLine("<style>")
            writer.WriteLine("body {background-color:white; font-family:Verdana, Geneva, sans-serif;}")
            writer.WriteLine("h1   {color:#004380;}")
            writer.WriteLine("h2   {color:#005199;background-color: #cce7ff;width: 95%; padding: 6px 0 6px 10px; margin-bottom: 10px;}")

            writer.WriteLine(".environmentDetails tr:nth-of-type(odd) {background-color:#f1f1f1; font-family:'Comic Sans MS', cursive, sans-serif;}")
            writer.WriteLine(".environmentDetails tr:nth-of-type(even) {background-color:#ddeeff; font-family:'Comic Sans MS', cursive, sans-serif;}")
            writer.WriteLine(".environmentDetails td{padding: 3px;text-align: left;}")

            writer.WriteLine(".executionSteps tr:nth-of-type(odd) {")
            writer.WriteLine("    background-color:#f1f1f1;")
            writer.WriteLine("}")
            writer.WriteLine(".executionSteps tr:nth-of-type(even) {")
            writer.WriteLine("    background-color:#fff;")
            writer.WriteLine("}")
            writer.WriteLine(".executionSteps th, .executionSteps td {padding: 5px;text-align: left;}")
            writer.WriteLine(".pass { background-color:#8ed576; color:White}")
            writer.WriteLine(".fail { background-color:#ffaa90; color:Red}")
            writer.WriteLine(".notExecuted { background-color:#ffff66;}")
            writer.WriteLine(".executionSteps td { white-space:pre;")
            writer.WriteLine("max-width: 100px;")
            writer.WriteLine("overflow: hidden;")
            writer.WriteLine("text-overflow: ellipsis;")
            writer.WriteLine("white-space: nowrap;}")
            writer.WriteLine("</style>")

            writer.WriteLine("<script type='text/javascript' src='https://www.google.com/jsapi'></script>")
            writer.WriteLine("<script type='text/javascript'>")
            writer.WriteLine("  google.load('visualization', '1', {packages:['corechart']});")
            writer.WriteLine("  google.setOnLoadCallback(drawChart);")
            writer.WriteLine("  function drawChart() {")
            writer.WriteLine("")
            writer.WriteLine("    var data = google.visualization.arrayToDataTable([")
            writer.WriteLine("      ['Status', 'Number of steps'],")

            writer.WriteLine("      ['Passed Test Cases',     " + multipleReports.getPassedRunsCount() + "],")
            writer.WriteLine("      ['Failed Test Cases',     " + multipleReports.getFailedRunsCount() + "],")
            writer.WriteLine("      ['NotExecuted Test Cases',  " + multipleReports.getNotExecutedRunsCount() + "],")
            writer.WriteLine("    ]);")
            writer.WriteLine("")
            writer.WriteLine("    var options = {")
            writer.WriteLine("      title: 'Summary',")
            writer.WriteLine("      is3D: true,")
            writer.WriteLine("      slices: {")
            writer.WriteLine("          0: { color: 'Green' },")
            writer.WriteLine("          1: { color: 'Red' },")
            writer.WriteLine("          2: { color: 'Yellow' }")
            writer.WriteLine("        }")
            writer.WriteLine("    };")
            writer.WriteLine("")
            writer.WriteLine("    var chart = new google.visualization.PieChart(document.getElementById('consolidatedPieChart'));")
            writer.WriteLine("")
            writer.WriteLine("    chart.draw(data, options);")
            writer.WriteLine("  }")
            writer.WriteLine("</script>")
            writer.WriteLine("</head>")

            writer.WriteLine("<body>")
            writer.WriteLine("<table width=100%><tr>")
            writer.WriteLine("<td>" + "<img src=" + multipleReports.ProjectLogo + " alt='" + multipleReports.ProjectLogo + "' height='75px'>" + "</td> " + "<td width=70%><center><h1>" + multipleReports.Header + "</h1></center></td>" + "<td>" + "<img src=" + multipleReports.pCloudyLogo + " alt='" + multipleReports.pCloudyLogo + "' height='75px'>" + "</td>")
            writer.WriteLine("</tr></table>")

            writer.WriteLine("<hr/>")


            writer.WriteLine("<h2><u>Execution Details</u></h2>")

            writer.WriteLine("<table width='100%'><tr><td align='center' width='85%'>")

            writer.WriteLine("<table class='executionSteps' width=100% align='left'>")

            writer.WriteLine("<tr><th>#</th> <th width='35%'>Device</th> <th>Total Duration</th> <th width='10%'>Steps %</th> <th>Passed TestCases</th> <th>Failed TestCases</th> <th>TestCases %</th> <th width='20%'>Status</th></tr>")

            For Each singleReport In multipleReports


                Dim singleRunPath As String = "./" + singleReport.Header + "/" + singleReport.Header + ".html"
                Dim singleRunDetail As String = "<a href='" + singleRunPath + "'>" + singleReport.Header + "</a>"

                writer.WriteLine("  <tr>")
                writer.WriteLine("    <td>" + (multipleReports.IndexOf(singleReport) + 1) + "</td>")
                writer.WriteLine("    <td width='55%'>" + singleRunDetail + "</td>")
                writer.WriteLine("    <td>" + singleReport.durationInSeconds() + "</td>")

                Dim stepsResultBar As String = "<td><table border='0' width='90%' height='28px'><tr>"
                If (singleReport.getPassedStepsCount() > 0) Then


                    stepsResultBar += "<td title='" + singleReport.getPassedStepsCount() + "' bgcolor='green' width=" + singleReport.getPassedStepsCount() + "></td>"
                    If (singleReport.getFailedStepsCount() > 0) Then
                        stepsResultBar += "<td title='" + singleReport.getFailedStepsCount() + "' bgcolor='red' width='" + singleReport.getFailedStepsCount() + "'></td>"
                        stepsResultBar += "</tr></table></td>"
                        writer.WriteLine(stepsResultBar)
                    End If
                    writer.WriteLine("    <td>" + singleReport.getPassedTestCasesCount() + "</td>")
                    writer.WriteLine("    <td>" + singleReport.getFailedTestCasesCount() + "</td>")
                    writer.WriteLine("    <td>" + singleReport.getPassedTestCasesPercentage() + "</td>")
                End If
                Dim testCaseResultBar As String = "<td><table border='0' width='90%' height='28px'><tr>"
                If (singleReport.getPassedTestCasesCount() > 0) Then
                    testCaseResultBar += "<td title='" + singleReport.getPassedTestCasesCount() + "' bgcolor='green' width=" + singleReport.getPassedTestCasesCount() + "></td>"
                    If (singleReport.getFailedTestCasesCount() > 0) Then
                        testCaseResultBar += "<td title='" + singleReport.getFailedTestCasesCount() + "' bgcolor='red' width='" + singleReport.getFailedTestCasesCount() + "'></td>"
                        testCaseResultBar += "</tr></table></td>"
                        writer.WriteLine(testCaseResultBar)
                    End If
                End If
                writer.WriteLine("  </tr>")


            Next
            writer.WriteLine("</table>")
            writer.WriteLine("</td>" + "<td align='center'><div id='consolidatedPieChart' style='width: 250px; height: 250px; display: none;'></div>" + "</td></tr></table>")

            writer.Flush()

            writer.WriteLine("<hr/>")

            writer.WriteLine("</body>")
            writer.WriteLine("</html>")
            'writer.Close()

        End Using

    End Sub

    Private Function toHtml(input As String) As String

        Return "<pre>" + input + "</pre>"
    End Function



End Class
