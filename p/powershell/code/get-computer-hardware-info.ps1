

#	参考：
#		https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/computer-system-hardware-classes
#		https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/operating-system-classes
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-wmiobject
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/select-object
#		https://docs.microsoft.com/zh-cn/powershell/module/Microsoft.PowerShell.Core/about/about_special_characters
#		https://docs.microsoft.com/zh-cn/powershell/scripting/learn/deep-dives/everything-about-arrays
#	    https://docs.microsoft.com/zh-cn/powershell/scripting/learn/deep-dives/everything-about-if
#	    https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_for
#   说明：如果只是用"Get-WmiObject -Class Win32_Processor -ComputerName."，返回的信息比较少；添加"Select-Object -Property *" 返回的信息比较全


#	1、声明ArrayList的两种方式
#		$output = New-Object -TypeName 'System.Collections.ArrayList'
#		$output = [System.Collections.ArrayList]::new()
#	2、数组遍历
#		foreach ($item in $netAdapters) {}
#		for ( $index = 0; $index -lt $data.count; $index++){}


Write-Host "`n"


# 0、获取计算机信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-computersystem
$pc = Get-WmiObject -Class Win32_ComputerSystem -ComputerName. | Select-Object -Property * 

Write-Host "--------------> 计算机`t Win32_ComputerSystem ---------------------------------------------"
Write-Host "`t说明：分别在 Model 、 Manufacturer 、 SystemSKUNumber  属性获取下面的参数"
Write-Host "`t产品名称：`t$($pc.Model)"
Write-Host "`t制 造 商：`t$($pc.Manufacturer)"
Write-Host "`t产品编号：`t$($pc.SystemSKUNumber)"
Write-Host "`n"


# 1、获取CPU信息
# 	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-processor
#	其他-输出某些属性：Get-WmiObject -Class Win32_Processor | Select-Object -Property Name, Number*
$cpu = Get-WmiObject -Class Win32_Processor -ComputerName. | Select-Object -Property *

#	拼接字符串的几种方式：
#	Write-host "处理器：" $cpu.Name "`t核心数：" $cpu.NumberOfCores "`t线程数：" $cpu.NumberOfLogicalProcessors
#	Write-host ("处理器：" + $cpu.Name + "`t核心数："  + $cpu.NumberOfCores + "`t线程数：" + $cpu.NumberOfLogicalProcessors)
#	Write-Host "处理器：$($cpu.Name)`t核心数：$($cpu.NumberOfCores)`t线程数：$($cpu.NumberOfLogicalProcessors)"

Write-Host "--------------> 处理器`t Win32_Processor ---------------------------------------------"
Write-Host "`t说明：分别在 Name 、 NumberOfCores 、 NumberOfLogicalProcessors 属性获取下面的参数"
Write-Host "`t处 理 器：`t$($cpu.Name)"
Write-Host "`t核 心 数：`t$($cpu.NumberOfCores)"
Write-Host "`t线 程 数：`t$($cpu.NumberOfLogicalProcessors)"
Write-Host "`n"


# 2、获取主板信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-baseboard
$baseBoard = Get-WmiObject -Class Win32_BaseBoard -ComputerName. | Select-Object -Property * 

Write-Host "--------------> 主板`t Win32_BaseBoard ---------------------------------------------"
Write-Host "`t说明：分别在 Manufacturer 、 Product 、 SerialNumber 、 Version 属性获取下面的参数"
Write-Host "`t制 造 商：`t$($baseBoard.Manufacturer)"
Write-Host "`t部 件 号：`t$($baseBoard.Product)"
Write-Host "`t序 列 号：`t$($baseBoard.SerialNumber)"
Write-Host "`t版    本：`t$($baseBoard.Version)"
Write-Host "`n"


# 3、获取内存信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-physicalmemory
$memory = Get-WmiObject -Class Win32_PhysicalMemory -ComputerName. | Select-Object -Property *

$memorys = [System.Collections.ArrayList]::new()
if ($memory -is [array]){
	$memorys = $memory;
}else{
	[void] $memorys.add($memory)
}

Write-Host "--------------> 内存`t Win32_PhysicalMemory ---------------------------------------------"
Write-Host "`t说明：分别在 Manufacturer 、 PartNumber 、 SerialNumber 、 Capacity 属性获取下面的参数"
if($memorys.Count -gt 0){
	for ($i = 0; $i -le ($memorys.Count - 1); $i += 1) {
		Write-Host "`t这是您的第$($i+1)块内存条的信息：" 
		Write-Host "`t制 造 商：`t$($memorys[$i].Manufacturer)"
		Write-Host "`t部 件 号：`t$($memorys[$i].PartNumber)"
		Write-Host "`t序 列 号：`t$($memorys[$i].SerialNumber)"
		Write-Host "`t容    量：`t$($memorys[$i].Capacity/1GB)GB"
	}
}
else{
	Write-Host "很抱歉，没有找到任何内存条……"
}
Write-Host "`n"


# 4、获取声卡信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-sounddevice
$sound = Get-WmiObject -Class Win32_SoundDevice -ComputerName. | Select-Object -Property *

$sounds = [System.Collections.ArrayList]::new()
if ($sound -is [array]){
	$sounds = $sound;
}else{
	[void] $sounds.add($sound)
}

Write-Host "--------------> 声卡`t Win32_SoundDevice ---------------------------------------------"
Write-Host "`t说明：分别在 Name 、 Manufacturer  属性获取下面的参数"
if($sounds.Count -gt 0){
	for ($i = 0; $i -le ($sounds.Count - 1); $i += 1) {
		Write-Host "`t这是您的第$($i+1)块声卡的信息：" 
		Write-Host "`t名    称：`t$($sounds[$i].Name)" 
		Write-Host "`t制 造 商：`t$($sounds[$i].Manufacturer)" 
	}
}
else{
	Write-Host "很抱歉，没有找到任何声卡……"
}
Write-Host "`n"


# 5、获取显卡信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-videocontroller
$nvdia = Get-WmiObject -Class Win32_VideoController -ComputerName. | Select-Object -Property *

$nvdias = [System.Collections.ArrayList]::new()
if ($nvdia -is [array]){
	$nvdias = $nvdia;
}else{
	[void] $nvdias.add($nvdia)
}

Write-Host "--------------> 显卡`t Win32_VideoController ---------------------------------------------"
Write-Host "`t说明：分别在 Name 、 DeviceID 、 Description 、 DriverDate 、 DriverVersion   属性获取下面的参数"
if($nvdias.Count -gt 0){
	for ($i = 0; $i -le ($nvdias.Count - 1); $i += 1) {
		Write-Host "`t这是您的第$($i+1)块显卡的信息：" 
		Write-Host "`t名    称：`t$($nvdias[$i].Name)" 
		Write-Host "`t设 备 ID：`t$($nvdias[$i].DeviceID)"
		Write-Host "`t描    述：`t$($nvdias[$i].Description)" 
		Write-Host "`t驱动日期：`t$($nvdias[$i].DriverDate)" 
		Write-Host "`t驱动版本：`t$($nvdias[$i].DriverVersion)" 
	}
}
else{
	Write-Host "很抱歉，没有找到任何显卡……"
}
Write-Host "`n"


# 6、获取网卡信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-networkadapterconfiguration
#	说明："Get-WmiObject -Class Win32_NetworkAdapterConfiguration -ComputerName. | Select-Object -Property *"  这个返回的个数太多了 
$netAdapter = Get-NetAdapter | Select-Object -Property * 

$netAdapters = [System.Collections.ArrayList]::new()
if ($netAdapter -is [array]){
	$netAdapters = $netAdapter;
}else{
	[void] $netAdapters.add($netAdapter)
}

Write-Host "--------------> 网卡`t Get-NetAdapter ---------------------------------------------"
Write-Host "`t说明-网卡：分别在 ifName 、 ifDesc 、 MediaConnectionState 、 MacAddress 属性获取下面的参数"
Write-Host "`t说明-驱动：分别在 DriverFileName 、 DriverProvider 、 DriverVersion 、 DriverInformation 、 DriverDescription  属性获取下面的参数"
if($netAdapters.Count -gt 0){
	for ($i = 0; $i -le ($netAdapters.Count - 1); $i += 1) {
		Write-Host "`t这是您的第$($i+1)块网卡的信息：" 
		Write-Host "`t名    称：`t$($netAdapters[$i].ifName)" 
		Write-Host "`t描    述：`t$($netAdapters[$i].ifDesc)" 
		Write-Host "`t连接状态：`t$($netAdapters[$i].MediaConnectionState)" 
		Write-Host "`tMac 地址：`t$($netAdapters[$i].MacAddress)" 
		Write-Host "`t下面是网卡驱动信息："
		Write-Host "`t文件名称：`t$($netAdapters[$i].DriverFileName)" 
		Write-Host "`t提 供 商：`t$($netAdapters[$i].DriverProvider)" 
		Write-Host "`t版    本：`t$($netAdapters[$i].DriverVersion)" 
		Write-Host "`t描    述：`t$($netAdapters[$i].DriverDescription)" 
	}
}
else{
	Write-Host "很抱歉，没有找到任何网卡……"
}
Write-Host "`n"


Write-Host "(*^_^*)(*^_^*)(*^_^*) 执行结束，按任意键退出..."
Read-Host | Out-Null
exit