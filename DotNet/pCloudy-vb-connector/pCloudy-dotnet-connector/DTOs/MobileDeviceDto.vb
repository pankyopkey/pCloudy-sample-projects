<Serializable()>
Public Class MobileDeviceDTO
    'Inherits CresTech.OpKey.Data.Contracts.MobileDeviceDTO


    Public Property index As Integer
    Public Property full_name As String
    Public Property id As String
    Public Property model As String
    Public Property display_name As String
    Public Property platform As String
    Public Property version As String
    Public Property bucket As String
    Public Property manufacturer As String
    Public Property url As String
    Public Property ram As String
    Public Property resolution As String
    Public Property display_area As String
    Public Property available As Boolean
    Public Property SerialNumber As String


    'Public Overrides Function Equals(ByVal obj As Object) As Boolean
    '    If Not TypeOf (obj) Is MobileDeviceDTO Then
    '        Return False

    '    Else
    '        Dim other As MobileDeviceDTO = CType(obj, MobileDeviceDTO)

    '        If Me.manufacturer <> other.manufacturer Then Return False
    '        If Me.Model <> other.Model Then Return False

    '        If Me.Platform <> other.Platform Then
    '            Return Me.Platform.ToLower.Contains(other.Platform.ToLower) Or
    '                other.Platform.ToLower.Contains(Me.Platform.ToLower)
    '        End If

    '        Return True
    '    End If
    'End Function

End Class
