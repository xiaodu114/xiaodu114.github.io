

#	参考：
#		https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/computer-system-hardware-classes
#		https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/operating-system-classes
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.management/get-wmiobject
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/select-object
#		https://docs.microsoft.com/zh-cn/powershell/module/Microsoft.PowerShell.Core/about/about_special_characters
#	    https://docs.microsoft.com/zh-cn/powershell/scripting/learn/deep-dives/everything-about-if
#	    https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_for
#		下面是输出文件相关
#		https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-date
#		https://docs.microsoft.com/zh-cn/powershell/scripting/learn/deep-dives/everything-about-arrays
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/out-file
#   说明：如果只是用"Get-WmiObject -Class Win32_Processor -ComputerName."，返回的信息比较少；添加"Select-Object -Property *" 返回的信息比较全


#	1、时间戳并取整
#		$timeStamp = [long](Get-Date -UFormat %s)
#	2、声明ArrayList的两种方式
#		$output = New-Object -TypeName 'System.Collections.ArrayList'
#		$output = [System.Collections.ArrayList]::new()
#	3、[void] $output.add(666)	之后会打印索引值，下面是两种解决办法
#		[void] [void] $output.add(666);
#		[void] $output.add(666) > $null


$output = [System.Collections.ArrayList]::new()
[void] $output.add("`n")


# 0、获取计算机信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-computersystem
$pc = Get-WmiObject -Class Win32_ComputerSystem -ComputerName. | Select-Object -Property * 

[void] $output.add("--------------> 计算机`t Win32_ComputerSystem ---------------------------------------------")
[void] $output.add("`t说明：分别在 Model 、 Manufacturer 、 SystemSKUNumber  属性获取下面的参数")
[void] $output.add("`t产品名称：`t$($pc.Model)")
[void] $output.add("`t制 造 商：`t$($pc.Manufacturer)")
[void] $output.add("`t产品编号：`t$($pc.SystemSKUNumber)")
[void] $output.add("`n")


# 1、获取CPU信息
# 	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-processor
#	其他-输出某些属性：Get-WmiObject -Class Win32_Processor | Select-Object -Property Name, Number*
$cpu = Get-WmiObject -Class Win32_Processor -ComputerName. | Select-Object -Property *

#	拼接字符串的几种方式：
#	Write-host "处理器：" $cpu.Name "`t核心数：" $cpu.NumberOfCores "`t线程数：" $cpu.NumberOfLogicalProcessors
#	Write-host ("处理器：" + $cpu.Name + "`t核心数："  + $cpu.NumberOfCores + "`t线程数：" + $cpu.NumberOfLogicalProcessors)
#	Write-Host "处理器：$($cpu.Name)`t核心数：$($cpu.NumberOfCores)`t线程数：$($cpu.NumberOfLogicalProcessors)"

[void] $output.add("--------------> 处理器`t Win32_Processor ---------------------------------------------")
[void] $output.add("`t说明：分别在 Name 、 NumberOfCores 、 NumberOfLogicalProcessors 属性获取下面的参数")
[void] $output.add("`t处 理 器：`t$($cpu.Name)")
[void] $output.add("`t核 心 数：`t$($cpu.NumberOfCores)")
[void] $output.add("`t线 程 数：`t$($cpu.NumberOfLogicalProcessors)")
[void] $output.add("`n")


# 2、获取主板信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-baseboard
$baseBoard = Get-WmiObject -Class Win32_BaseBoard -ComputerName. | Select-Object -Property * 

[void] $output.add("--------------> 主板`t Win32_BaseBoard ---------------------------------------------")
[void] $output.add("`t说明：分别在 Manufacturer 、 Product 、 SerialNumber 、 Version 属性获取下面的参数")
[void] $output.add("`t制 造 商：`t$($baseBoard.Manufacturer)")
[void] $output.add("`t部 件 号：`t$($baseBoard.Product)")
[void] $output.add("`t序 列 号：`t$($baseBoard.SerialNumber)")
[void] $output.add("`t版    本：`t$($baseBoard.Version)")
[void] $output.add("`n")


# 3、获取内存信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-physicalmemory
$memory = Get-WmiObject -Class Win32_PhysicalMemory -ComputerName. | Select-Object -Property * 

[void] $output.add("--------------> 内存`t Win32_PhysicalMemory ---------------------------------------------")
[void] $output.add("`t说明：分别在 Manufacturer 、 PartNumber 、 SerialNumber 、 Capacity 属性获取下面的参数")
[void] $output.add("`t制 造 商：`t$($memory.Manufacturer)")
[void] $output.add("`t部 件 号：`t$($memory.PartNumber)")
[void] $output.add("`t序 列 号：`t$($memory.SerialNumber)")
[void] $output.add("`t容    量：`t$($memory.Capacity/1GB)GB")
[void] $output.add("`n")


# 4、获取声卡信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-sounddevice
$sounds = Get-WmiObject -Class Win32_SoundDevice -ComputerName. | Select-Object -Property *

[void] $output.add("--------------> 声卡`t Win32_SoundDevice ---------------------------------------------")
[void] $output.add("`t说明：分别在 Name 、 Manufacturer  属性获取下面的参数")
if ($sounds -is [array]) {
	if($sounds.length -gt 0){
		#	遍历方式
		#	foreach ($item in $netAdapters) {}
		for ($i = 0; $i -le ($sounds.length - 1); $i += 1) {
			[void] $output.add("`t这是您的第$($i+1)块声卡的信息：") 
		    [void] $output.add("`t名    称：`t$($sounds[$i].Name)")
		    [void] $output.add("`t制 造 商：`t$($sounds[$i].Manufacturer)") 
		}
	}
	else{
		[void] $output.add("很抱歉，没有找到任何声卡……")
	}
}else{
	[void] $output.add("Get-WmiObject -Class Win32_SoundDevice -ComputerName. | Select-Object -Property * 得到结果不是数组，还没有遇到这种情况……")
}
[void] $output.add("`n")


# 5、获取显卡信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-videocontroller
$nvdias = Get-WmiObject -Class Win32_VideoController -ComputerName. | Select-Object -Property *

[void] $output.add("--------------> 显卡`t Win32_VideoController ---------------------------------------------")
[void] $output.add("`t说明：分别在 Name 、 DeviceID 、 Description 、 DriverDate 、 DriverVersion   属性获取下面的参数")
if ($nvdias -is [array]) {
	if($nvdias.length -gt 0){
		for ($i = 0; $i -le ($nvdias.length - 1); $i += 1) {
			[void] $output.add("`t这是您的第$($i+1)块显卡的信息：")
		    [void] $output.add("`t名    称：`t$($nvdias[$i].Name)") 
		    [void] $output.add("`t设 备 ID：`t$($nvdias[$i].DeviceID)")
			[void] $output.add("`t描    述：`t$($nvdias[$i].Description)") 
			[void] $output.add("`t驱动日期：`t$($nvdias[$i].DriverDate)") 
			[void] $output.add("`t驱动版本：`t$($nvdias[$i].DriverVersion)") 
		}
	}
	else{
		[void] $output.add("很抱歉，没有找到任何显卡……")
	}
}else{
	[void] $output.add("Get-WmiObject -Class Win32_VideoController -ComputerName. | Select-Object -Property * 得到结果不是数组，还没有遇到这种情况……")
}
[void] $output.add("`n")


# 6、获取网卡信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-networkadapterconfiguration
#	说明："Get-WmiObject -Class Win32_NetworkAdapterConfiguration -ComputerName. | Select-Object -Property *"  这个返回的个数太多了 
$netAdapters = Get-NetAdapter | Select-Object -Property * 

[void] $output.add("--------------> 网卡`t Get-NetAdapter ---------------------------------------------")
[void] $output.add("`t说明-网卡：分别在 ifName 、 ifDesc 、 MediaConnectionState 、 MacAddress 属性获取下面的参数")
[void] $output.add("`t说明-驱动：分别在 DriverFileName 、 DriverProvider 、 DriverVersion 、 DriverInformation 、 DriverDescription  属性获取下面的参数")
if ($netAdapters -is [array]) {
	if($netAdapters.length -gt 0){
		for ($i = 0; $i -le ($netAdapters.length - 1); $i += 1) {
			[void] $output.add("`t这是您的第$($i+1)块网卡的信息：") 
		    [void] $output.add("`t名    称：`t$($netAdapters[$i].ifName)") 
		    [void] $output.add("`t描    述：`t$($netAdapters[$i].ifDesc)") 
		    [void] $output.add("`t连接状态：`t$($netAdapters[$i].MediaConnectionState)") 
		    [void] $output.add("`tMac 地址：`t$($netAdapters[$i].MacAddress)") 
			[void] $output.add("`t下面是网卡驱动信息：")
		    [void] $output.add("`t文件名称：`t$($netAdapters[$i].DriverFileName)") 
		    [void] $output.add("`t提 供 商：`t$($netAdapters[$i].DriverProvider)") 
		    [void] $output.add("`t版    本：`t$($netAdapters[$i].DriverVersion)") 
		    [void] $output.add("`t描    述：`t$($netAdapters[$i].DriverDescription)") 
		}
	}
	else{
		[void] $output.add("很抱歉，没有找到任何网卡……")
	}
}else{
	[void] $output.add("Get-NetAdapter | Select-Object -Property * 得到结果不是数组，还没有遇到这种情况……")
}
[void] $output.add("`n")

foreach ($item in $output) {
	Write-Host $item
}


$pathName = "D:\computer-hardware-" + [long](Get-Date -UFormat %s) + ".txt"

Write-Host "(*^_^*)(*^_^*)(*^_^*) _ _ _ (*^_^*)(*^_^*)(*^_^*)"
Write-Host "所有信息已经全部输出，如果您需要保存到txt文档，请输入 y ，之后将为您保存到：" $pathName

$inputStr = Read-Host "请输入"
if ($inputStr.ToString().ToLower() -eq "y"){
	#	Out-File -FilePath $pathName -InputObject $output -Encoding ASCII -Width 50
	Out-File -FilePath $pathName -InputObject $output
	Write-Host "保存成功，赶紧去看看吧！"
}else{
	Write-Host "很遗憾，您没有选择将上面的信息保存到txt……"
}

Write-Host "`n"
Write-Host "......没有了，真的没有了，按任意键退出......"
Read-Host | Out-Null
exit