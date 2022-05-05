

#	�ο���
#		https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/computer-system-hardware-classes
#		https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/operating-system-classes
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-wmiobject
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/select-object
#		https://docs.microsoft.com/zh-cn/powershell/module/Microsoft.PowerShell.Core/about/about_special_characters
#		https://docs.microsoft.com/zh-cn/powershell/scripting/learn/deep-dives/everything-about-arrays
#	    https://docs.microsoft.com/zh-cn/powershell/scripting/learn/deep-dives/everything-about-if
#	    https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_for
#   ˵�������ֻ����"Get-WmiObject -Class Win32_Processor -ComputerName."�����ص���Ϣ�Ƚ��٣����"Select-Object -Property *" ���ص���Ϣ�Ƚ�ȫ


#	1������ArrayList�����ַ�ʽ
#		$output = New-Object -TypeName 'System.Collections.ArrayList'
#		$output = [System.Collections.ArrayList]::new()
#	2���������
#		foreach ($item in $netAdapters) {}
#		for ( $index = 0; $index -lt $data.count; $index++){}


Write-Host "`n"


# 0����ȡ�������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-computersystem
$pc = Get-WmiObject -Class Win32_ComputerSystem -ComputerName. | Select-Object -Property * 

Write-Host "--------------> �����`t Win32_ComputerSystem ---------------------------------------------"
Write-Host "`t˵�����ֱ��� Model �� Manufacturer �� SystemSKUNumber  ���Ի�ȡ����Ĳ���"
Write-Host "`t��Ʒ���ƣ�`t$($pc.Model)"
Write-Host "`t�� �� �̣�`t$($pc.Manufacturer)"
Write-Host "`t��Ʒ��ţ�`t$($pc.SystemSKUNumber)"
Write-Host "`n"


# 1����ȡCPU��Ϣ
# 	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-processor
#	����-���ĳЩ���ԣ�Get-WmiObject -Class Win32_Processor | Select-Object -Property Name, Number*
$cpu = Get-WmiObject -Class Win32_Processor -ComputerName. | Select-Object -Property *

#	ƴ���ַ����ļ��ַ�ʽ��
#	Write-host "��������" $cpu.Name "`t��������" $cpu.NumberOfCores "`t�߳�����" $cpu.NumberOfLogicalProcessors
#	Write-host ("��������" + $cpu.Name + "`t��������"  + $cpu.NumberOfCores + "`t�߳�����" + $cpu.NumberOfLogicalProcessors)
#	Write-Host "��������$($cpu.Name)`t��������$($cpu.NumberOfCores)`t�߳�����$($cpu.NumberOfLogicalProcessors)"

Write-Host "--------------> ������`t Win32_Processor ---------------------------------------------"
Write-Host "`t˵�����ֱ��� Name �� NumberOfCores �� NumberOfLogicalProcessors ���Ի�ȡ����Ĳ���"
Write-Host "`t�� �� ����`t$($cpu.Name)"
Write-Host "`t�� �� ����`t$($cpu.NumberOfCores)"
Write-Host "`t�� �� ����`t$($cpu.NumberOfLogicalProcessors)"
Write-Host "`n"


# 2����ȡ������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-baseboard
$baseBoard = Get-WmiObject -Class Win32_BaseBoard -ComputerName. | Select-Object -Property * 

Write-Host "--------------> ����`t Win32_BaseBoard ---------------------------------------------"
Write-Host "`t˵�����ֱ��� Manufacturer �� Product �� SerialNumber �� Version ���Ի�ȡ����Ĳ���"
Write-Host "`t�� �� �̣�`t$($baseBoard.Manufacturer)"
Write-Host "`t�� �� �ţ�`t$($baseBoard.Product)"
Write-Host "`t�� �� �ţ�`t$($baseBoard.SerialNumber)"
Write-Host "`t��    ����`t$($baseBoard.Version)"
Write-Host "`n"


# 3����ȡ�ڴ���Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-physicalmemory
$memory = Get-WmiObject -Class Win32_PhysicalMemory -ComputerName. | Select-Object -Property *

$memorys = [System.Collections.ArrayList]::new()
if ($memory -is [array]){
	$memorys = $memory;
}else{
	[void] $memorys.add($memory)
}

Write-Host "--------------> �ڴ�`t Win32_PhysicalMemory ---------------------------------------------"
Write-Host "`t˵�����ֱ��� Manufacturer �� PartNumber �� SerialNumber �� Capacity ���Ի�ȡ����Ĳ���"
if($memorys.Count -gt 0){
	for ($i = 0; $i -le ($memorys.Count - 1); $i += 1) {
		Write-Host "`t�������ĵ�$($i+1)���ڴ�������Ϣ��" 
		Write-Host "`t�� �� �̣�`t$($memorys[$i].Manufacturer)"
		Write-Host "`t�� �� �ţ�`t$($memorys[$i].PartNumber)"
		Write-Host "`t�� �� �ţ�`t$($memorys[$i].SerialNumber)"
		Write-Host "`t��    ����`t$($memorys[$i].Capacity/1GB)GB"
	}
}
else{
	Write-Host "�ܱ�Ǹ��û���ҵ��κ��ڴ�������"
}
Write-Host "`n"


# 4����ȡ������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-sounddevice
$sound = Get-WmiObject -Class Win32_SoundDevice -ComputerName. | Select-Object -Property *

$sounds = [System.Collections.ArrayList]::new()
if ($sound -is [array]){
	$sounds = $sound;
}else{
	[void] $sounds.add($sound)
}

Write-Host "--------------> ����`t Win32_SoundDevice ---------------------------------------------"
Write-Host "`t˵�����ֱ��� Name �� Manufacturer  ���Ի�ȡ����Ĳ���"
if($sounds.Count -gt 0){
	for ($i = 0; $i -le ($sounds.Count - 1); $i += 1) {
		Write-Host "`t�������ĵ�$($i+1)����������Ϣ��" 
		Write-Host "`t��    �ƣ�`t$($sounds[$i].Name)" 
		Write-Host "`t�� �� �̣�`t$($sounds[$i].Manufacturer)" 
	}
}
else{
	Write-Host "�ܱ�Ǹ��û���ҵ��κ���������"
}
Write-Host "`n"


# 5����ȡ�Կ���Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-videocontroller
$nvdia = Get-WmiObject -Class Win32_VideoController -ComputerName. | Select-Object -Property *

$nvdias = [System.Collections.ArrayList]::new()
if ($nvdia -is [array]){
	$nvdias = $nvdia;
}else{
	[void] $nvdias.add($nvdia)
}

Write-Host "--------------> �Կ�`t Win32_VideoController ---------------------------------------------"
Write-Host "`t˵�����ֱ��� Name �� DeviceID �� Description �� DriverDate �� DriverVersion   ���Ի�ȡ����Ĳ���"
if($nvdias.Count -gt 0){
	for ($i = 0; $i -le ($nvdias.Count - 1); $i += 1) {
		Write-Host "`t�������ĵ�$($i+1)���Կ�����Ϣ��" 
		Write-Host "`t��    �ƣ�`t$($nvdias[$i].Name)" 
		Write-Host "`t�� �� ID��`t$($nvdias[$i].DeviceID)"
		Write-Host "`t��    ����`t$($nvdias[$i].Description)" 
		Write-Host "`t�������ڣ�`t$($nvdias[$i].DriverDate)" 
		Write-Host "`t�����汾��`t$($nvdias[$i].DriverVersion)" 
	}
}
else{
	Write-Host "�ܱ�Ǹ��û���ҵ��κ��Կ�����"
}
Write-Host "`n"


# 6����ȡ������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-networkadapterconfiguration
#	˵����"Get-WmiObject -Class Win32_NetworkAdapterConfiguration -ComputerName. | Select-Object -Property *"  ������صĸ���̫���� 
$netAdapter = Get-NetAdapter | Select-Object -Property * 

$netAdapters = [System.Collections.ArrayList]::new()
if ($netAdapter -is [array]){
	$netAdapters = $netAdapter;
}else{
	[void] $netAdapters.add($netAdapter)
}

Write-Host "--------------> ����`t Get-NetAdapter ---------------------------------------------"
Write-Host "`t˵��-�������ֱ��� ifName �� ifDesc �� MediaConnectionState �� MacAddress ���Ի�ȡ����Ĳ���"
Write-Host "`t˵��-�������ֱ��� DriverFileName �� DriverProvider �� DriverVersion �� DriverInformation �� DriverDescription  ���Ի�ȡ����Ĳ���"
if($netAdapters.Count -gt 0){
	for ($i = 0; $i -le ($netAdapters.Count - 1); $i += 1) {
		Write-Host "`t�������ĵ�$($i+1)����������Ϣ��" 
		Write-Host "`t��    �ƣ�`t$($netAdapters[$i].ifName)" 
		Write-Host "`t��    ����`t$($netAdapters[$i].ifDesc)" 
		Write-Host "`t����״̬��`t$($netAdapters[$i].MediaConnectionState)" 
		Write-Host "`tMac ��ַ��`t$($netAdapters[$i].MacAddress)" 
		Write-Host "`t����������������Ϣ��"
		Write-Host "`t�ļ����ƣ�`t$($netAdapters[$i].DriverFileName)" 
		Write-Host "`t�� �� �̣�`t$($netAdapters[$i].DriverProvider)" 
		Write-Host "`t��    ����`t$($netAdapters[$i].DriverVersion)" 
		Write-Host "`t��    ����`t$($netAdapters[$i].DriverDescription)" 
	}
}
else{
	Write-Host "�ܱ�Ǹ��û���ҵ��κ���������"
}
Write-Host "`n"


Write-Host "(*^_^*)(*^_^*)(*^_^*) ִ�н�������������˳�..."
Read-Host | Out-Null
exit