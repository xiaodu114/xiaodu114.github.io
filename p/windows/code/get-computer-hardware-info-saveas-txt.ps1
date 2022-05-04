

#	�ο���
#		https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/computer-system-hardware-classes
#		https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/operating-system-classes
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-wmiobject
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/select-object
#		https://docs.microsoft.com/zh-cn/powershell/module/Microsoft.PowerShell.Core/about/about_special_characters
#	    https://docs.microsoft.com/zh-cn/powershell/scripting/learn/deep-dives/everything-about-if
#	    https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_for
#		����������ļ����
#		https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-date
#		https://docs.microsoft.com/zh-cn/powershell/scripting/learn/deep-dives/everything-about-arrays
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/out-file
#   ˵�������ֻ����"Get-WmiObject -Class Win32_Processor -ComputerName."�����ص���Ϣ�Ƚ��٣����"Select-Object -Property *" ���ص���Ϣ�Ƚ�ȫ


#	1��ʱ�����ȡ��
#		$timeStamp = [long](Get-Date -UFormat %s)
#	2������ArrayList�����ַ�ʽ
#		$output = New-Object -TypeName 'System.Collections.ArrayList'
#		$output = [System.Collections.ArrayList]::new()
#	3��[void] $output.add(666)	֮����ӡ����ֵ�����������ֽ���취
#		[void] [void] $output.add(666);
#		[void] $output.add(666) > $null


$output = [System.Collections.ArrayList]::new()
[void] $output.add("`n")


# 0����ȡ�������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-computersystem
$pc = Get-WmiObject -Class Win32_ComputerSystem -ComputerName. | Select-Object -Property * 

[void] $output.add("--------------> �����`t Win32_ComputerSystem ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Model �� Manufacturer �� SystemSKUNumber  ���Ի�ȡ����Ĳ���")
[void] $output.add("`t��Ʒ���ƣ�`t$($pc.Model)")
[void] $output.add("`t�� �� �̣�`t$($pc.Manufacturer)")
[void] $output.add("`t��Ʒ��ţ�`t$($pc.SystemSKUNumber)")
[void] $output.add("`n")


# 1����ȡCPU��Ϣ
# 	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-processor
#	����-���ĳЩ���ԣ�Get-WmiObject -Class Win32_Processor | Select-Object -Property Name, Number*
$cpu = Get-WmiObject -Class Win32_Processor -ComputerName. | Select-Object -Property *

#	ƴ���ַ����ļ��ַ�ʽ��
#	Write-host "��������" $cpu.Name "`t��������" $cpu.NumberOfCores "`t�߳�����" $cpu.NumberOfLogicalProcessors
#	Write-host ("��������" + $cpu.Name + "`t��������"  + $cpu.NumberOfCores + "`t�߳�����" + $cpu.NumberOfLogicalProcessors)
#	Write-Host "��������$($cpu.Name)`t��������$($cpu.NumberOfCores)`t�߳�����$($cpu.NumberOfLogicalProcessors)"

[void] $output.add("--------------> ������`t Win32_Processor ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Name �� NumberOfCores �� NumberOfLogicalProcessors ���Ի�ȡ����Ĳ���")
[void] $output.add("`t�� �� ����`t$($cpu.Name)")
[void] $output.add("`t�� �� ����`t$($cpu.NumberOfCores)")
[void] $output.add("`t�� �� ����`t$($cpu.NumberOfLogicalProcessors)")
[void] $output.add("`n")


# 2����ȡ������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-baseboard
$baseBoard = Get-WmiObject -Class Win32_BaseBoard -ComputerName. | Select-Object -Property * 

[void] $output.add("--------------> ����`t Win32_BaseBoard ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Manufacturer �� Product �� SerialNumber �� Version ���Ի�ȡ����Ĳ���")
[void] $output.add("`t�� �� �̣�`t$($baseBoard.Manufacturer)")
[void] $output.add("`t�� �� �ţ�`t$($baseBoard.Product)")
[void] $output.add("`t�� �� �ţ�`t$($baseBoard.SerialNumber)")
[void] $output.add("`t��    ����`t$($baseBoard.Version)")
[void] $output.add("`n")


# 3����ȡ�ڴ���Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-physicalmemory
$memory = Get-WmiObject -Class Win32_PhysicalMemory -ComputerName. | Select-Object -Property * 

[void] $output.add("--------------> �ڴ�`t Win32_PhysicalMemory ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Manufacturer �� PartNumber �� SerialNumber �� Capacity ���Ի�ȡ����Ĳ���")
[void] $output.add("`t�� �� �̣�`t$($memory.Manufacturer)")
[void] $output.add("`t�� �� �ţ�`t$($memory.PartNumber)")
[void] $output.add("`t�� �� �ţ�`t$($memory.SerialNumber)")
[void] $output.add("`t��    ����`t$($memory.Capacity/1GB)GB")
[void] $output.add("`n")


# 4����ȡ������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-sounddevice
$sounds = Get-WmiObject -Class Win32_SoundDevice -ComputerName. | Select-Object -Property *

[void] $output.add("--------------> ����`t Win32_SoundDevice ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Name �� Manufacturer  ���Ի�ȡ����Ĳ���")
if ($sounds -is [array]) {
	if($sounds.length -gt 0){
		#	������ʽ
		#	foreach ($item in $netAdapters) {}
		for ($i = 0; $i -le ($sounds.length - 1); $i += 1) {
			[void] $output.add("`t�������ĵ�$($i+1)����������Ϣ��") 
		    [void] $output.add("`t��    �ƣ�`t$($sounds[$i].Name)")
		    [void] $output.add("`t�� �� �̣�`t$($sounds[$i].Manufacturer)") 
		}
	}
	else{
		[void] $output.add("�ܱ�Ǹ��û���ҵ��κ���������")
	}
}else{
	[void] $output.add("Get-WmiObject -Class Win32_SoundDevice -ComputerName. | Select-Object -Property * �õ�����������飬��û�����������������")
}
[void] $output.add("`n")


# 5����ȡ�Կ���Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-videocontroller
$nvdias = Get-WmiObject -Class Win32_VideoController -ComputerName. | Select-Object -Property *

[void] $output.add("--------------> �Կ�`t Win32_VideoController ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Name �� DeviceID �� Description �� DriverDate �� DriverVersion   ���Ի�ȡ����Ĳ���")
if ($nvdias -is [array]) {
	if($nvdias.length -gt 0){
		for ($i = 0; $i -le ($nvdias.length - 1); $i += 1) {
			[void] $output.add("`t�������ĵ�$($i+1)���Կ�����Ϣ��")
		    [void] $output.add("`t��    �ƣ�`t$($nvdias[$i].Name)") 
		    [void] $output.add("`t�� �� ID��`t$($nvdias[$i].DeviceID)")
			[void] $output.add("`t��    ����`t$($nvdias[$i].Description)") 
			[void] $output.add("`t�������ڣ�`t$($nvdias[$i].DriverDate)") 
			[void] $output.add("`t�����汾��`t$($nvdias[$i].DriverVersion)") 
		}
	}
	else{
		[void] $output.add("�ܱ�Ǹ��û���ҵ��κ��Կ�����")
	}
}else{
	[void] $output.add("Get-WmiObject -Class Win32_VideoController -ComputerName. | Select-Object -Property * �õ�����������飬��û�����������������")
}
[void] $output.add("`n")


# 6����ȡ������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-networkadapterconfiguration
#	˵����"Get-WmiObject -Class Win32_NetworkAdapterConfiguration -ComputerName. | Select-Object -Property *"  ������صĸ���̫���� 
$netAdapters = Get-NetAdapter | Select-Object -Property * 

[void] $output.add("--------------> ����`t Get-NetAdapter ---------------------------------------------")
[void] $output.add("`t˵��-�������ֱ��� ifName �� ifDesc �� MediaConnectionState �� MacAddress ���Ի�ȡ����Ĳ���")
[void] $output.add("`t˵��-�������ֱ��� DriverFileName �� DriverProvider �� DriverVersion �� DriverInformation �� DriverDescription  ���Ի�ȡ����Ĳ���")
if ($netAdapters -is [array]) {
	if($netAdapters.length -gt 0){
		for ($i = 0; $i -le ($netAdapters.length - 1); $i += 1) {
			[void] $output.add("`t�������ĵ�$($i+1)����������Ϣ��") 
		    [void] $output.add("`t��    �ƣ�`t$($netAdapters[$i].ifName)") 
		    [void] $output.add("`t��    ����`t$($netAdapters[$i].ifDesc)") 
		    [void] $output.add("`t����״̬��`t$($netAdapters[$i].MediaConnectionState)") 
		    [void] $output.add("`tMac ��ַ��`t$($netAdapters[$i].MacAddress)") 
			[void] $output.add("`t����������������Ϣ��")
		    [void] $output.add("`t�ļ����ƣ�`t$($netAdapters[$i].DriverFileName)") 
		    [void] $output.add("`t�� �� �̣�`t$($netAdapters[$i].DriverProvider)") 
		    [void] $output.add("`t��    ����`t$($netAdapters[$i].DriverVersion)") 
		    [void] $output.add("`t��    ����`t$($netAdapters[$i].DriverDescription)") 
		}
	}
	else{
		[void] $output.add("�ܱ�Ǹ��û���ҵ��κ���������")
	}
}else{
	[void] $output.add("Get-NetAdapter | Select-Object -Property * �õ�����������飬��û�����������������")
}
[void] $output.add("`n")

foreach ($item in $output) {
	Write-Host $item
}


$pathName = "D:\computer-hardware-" + [long](Get-Date -UFormat %s) + ".txt"

Write-Host "(*^_^*)(*^_^*)(*^_^*) _ _ _ (*^_^*)(*^_^*)(*^_^*)"
Write-Host "������Ϣ�Ѿ�ȫ��������������Ҫ���浽txt�ĵ��������� y ��֮��Ϊ�����浽��" $pathName

$inputStr = Read-Host "������"
if ($inputStr.ToString().ToLower() -eq "y"){
	#	Out-File -FilePath $pathName -InputObject $output -Encoding ASCII -Width 50
	Out-File -FilePath $pathName -InputObject $output
	Write-Host "����ɹ����Ͻ�ȥ�����ɣ�"
}else{
	Write-Host "���ź�����û��ѡ���������Ϣ���浽txt����"
}

Write-Host "`n"
Write-Host "......û���ˣ����û���ˣ���������˳�......"
Read-Host | Out-Null
exit