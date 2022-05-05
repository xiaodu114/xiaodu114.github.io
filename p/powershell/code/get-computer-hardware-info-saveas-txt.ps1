

#	�ο���
#		https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-date
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/out-file


#	1��ʱ�����ȡ��
#		$timeStamp = [long](Get-Date -UFormat %s)
#	2��[void] $output.add(666)	֮����ӡ����ֵ�����������ֽ���취
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

$memorys = [System.Collections.ArrayList]::new()
if ($memory -is [array]){
	$memorys = $memory;
}else{
	[void] $memorys.add($memory)
}

[void] $output.add("--------------> �ڴ�`t Win32_PhysicalMemory ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Manufacturer �� PartNumber �� SerialNumber �� Capacity ���Ի�ȡ����Ĳ���")
if($memorys.Count -gt 0){
	for ($i = 0; $i -le ($memorys.Count - 1); $i += 1) {
		[void] $output.add("`t�������ĵ�$($i+1)���ڴ�������Ϣ��")
		[void] $output.add("`t�� �� �̣�`t$($memorys[$i].Manufacturer)")
		[void] $output.add("`t�� �� �ţ�`t$($memorys[$i].PartNumber)")
		[void] $output.add("`t�� �� �ţ�`t$($memorys[$i].SerialNumber)")
		[void] $output.add("`t��    ����`t$($memorys[$i].Capacity/1GB)GB")
	}
}
else{
	[void] $output.add("�ܱ�Ǹ��û���ҵ��κ��ڴ�������")
}
[void] $output.add("`n")


# 4����ȡ������Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-sounddevice
$sound = Get-WmiObject -Class Win32_SoundDevice -ComputerName. | Select-Object -Property *

$sounds = [System.Collections.ArrayList]::new()
if ($sound -is [array]){
	$sounds = $sound;
}else{
	[void] $sounds.add($sound)
}

[void] $output.add("--------------> ����`t Win32_SoundDevice ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Name �� Manufacturer  ���Ի�ȡ����Ĳ���")
if($sounds.Count -gt 0){
	for ($i = 0; $i -le ($sounds.Count - 1); $i += 1) { 
		[void] $output.add("`t�������ĵ�$($i+1)����������Ϣ��") 
		[void] $output.add("`t��    �ƣ�`t$($sounds[$i].Name)")
		[void] $output.add("`t�� �� �̣�`t$($sounds[$i].Manufacturer)") 
	}
}
else{
	[void] $output.add("�ܱ�Ǹ��û���ҵ��κ���������")
}
[void] $output.add("`n")


# 5����ȡ�Կ���Ϣ
#	�ο���https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-videocontroller
$nvdia = Get-WmiObject -Class Win32_VideoController -ComputerName. | Select-Object -Property *

$nvdias = [System.Collections.ArrayList]::new()
if ($nvdia -is [array]){
	$nvdias = $nvdia;
}else{
	[void] $nvdias.add($nvdia)
}

[void] $output.add("--------------> �Կ�`t Win32_VideoController ---------------------------------------------")
[void] $output.add("`t˵�����ֱ��� Name �� DeviceID �� Description �� DriverDate �� DriverVersion   ���Ի�ȡ����Ĳ���")
if($nvdias.Count -gt 0){
	for ($i = 0; $i -le ($nvdias.Count - 1); $i += 1) {
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
[void] $output.add("`n")


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

[void] $output.add("--------------> ����`t Get-NetAdapter ---------------------------------------------")
[void] $output.add("`t˵��-�������ֱ��� ifName �� ifDesc �� MediaConnectionState �� MacAddress ���Ի�ȡ����Ĳ���")
[void] $output.add("`t˵��-�������ֱ��� DriverFileName �� DriverProvider �� DriverVersion �� DriverInformation �� DriverDescription  ���Ի�ȡ����Ĳ���")
if($netAdapters.Count -gt 0){
	for ($i = 0; $i -le ($netAdapters.Count - 1); $i += 1) {
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