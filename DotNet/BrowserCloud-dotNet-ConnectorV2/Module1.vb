Imports System.Security.Cryptography
Imports System.Security.Policy

Module Module1

    Sub Main()
        Dim opkeyurl As String = "https://qa1.dev.opkeyone.com"
        Dim con = New BCloudConnectorV2(opkeyurl)
        Dim token = con.authenticateUser("aakarsh.mishra@opkey.com", "3rwv5g62m6phx8mc94zxpbbp")

        Dim vms As List(Of VmDetails) = con.GetAllVms(token)
        ' Dim browserDetails As Dictionary(Of String, List(Of String)) = con.GetAllVmBrowserDetails("https://qa1.dev.opkeyone.com/pcloudy/browser_cloud/api/internal/v1/get-vms", token, "https://browser.node-stg.pcloudy.com")

        'Dim vmIds As String = Nothing
        'If (vms IsNot Nothing) Then
        '    For Each VmDetail As VmDetails In vms
        '        vmIds = VmDetail.vmId
        '        ' Console.WriteLine("id is" + vmIds)
        '    Next
        'Else
        '    Console.WriteLine("No vm details found")
        'End If
        'Console.WriteLine(vmIds)
        ' Dim resolution = con.setResolutionVm(token, vmIds, "1440", "900")
        Dim browsers = con.getAvailableBrowsers(token, "00:50:56:a1:88:d5")
        ' Dim pref = con.getPreferredBrowser(token, "Mac", "Sonoma", "chrome", "108", "5c:1b:f4:e3:a7:cc")
        Dim pref = con.ProcessVmDetailsForBrowserSelection(token, "chrome", "108")
        ' Dim booking = con.bookVms(token, "5c:1b:f4:e3:a7:cc", "chrome", "108")
        ' Dim release = con.releaseVm("5c:1b:f4:e3:a7:cc", "cc7ba014-33e7-4b96-b55e-0b6caf7eb6c6")
        'Dim getRes = con.getResolutionVm(token, vmIds)
        Dim vmResolutions = con.getResolution(token)
        For Each resolution In vmResolutions
            Console.WriteLine(resolution)
        Next
        Console.Read()

    End Sub

End Module
