

#	参考：
#		https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/get-date
#		https://docs.microsoft.com/zh-cn/powershell/module/microsoft.powershell.utility/out-file


#	1、时间戳并取整
#		$timeStamp = [long](Get-Date -UFormat %s)
#	2、[void] $output.add(666)	之后会打印索引值，下面是两种解决办法
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

$memorys = [System.Collections.ArrayList]::new()
if ($memory -is [array]){
	$memorys = $memory;
}else{
	[void] $memorys.add($memory)
}

[void] $output.add("--------------> 内存`t Win32_PhysicalMemory ---------------------------------------------")
[void] $output.add("`t说明：分别在 Manufacturer 、 PartNumber 、 SerialNumber 、 Capacity 属性获取下面的参数")
if($memorys.Count -gt 0){
	for ($i = 0; $i -le ($memorys.Count - 1); $i += 1) {
		[void] $output.add("`t这是您的第$($i+1)块内存条的信息：")
		[void] $output.add("`t制 造 商：`t$($memorys[$i].Manufacturer)")
		[void] $output.add("`t部 件 号：`t$($memorys[$i].PartNumber)")
		[void] $output.add("`t序 列 号：`t$($memorys[$i].SerialNumber)")
		[void] $output.add("`t容    量：`t$($memorys[$i].Capacity/1GB)GB")
	}
}
else{
	[void] $output.add("很抱歉，没有找到任何内存条……")
}
[void] $output.add("`n")


# 4、获取声卡信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-sounddevice
$sound = Get-WmiObject -Class Win32_SoundDevice -ComputerName. | Select-Object -Property *

$sounds = [System.Collections.ArrayList]::new()
if ($sound -is [array]){
	$sounds = $sound;
}else{
	[void] $sounds.add($sound)
}

[void] $output.add("--------------> 声卡`t Win32_SoundDevice ---------------------------------------------")
[void] $output.add("`t说明：分别在 Name 、 Manufacturer  属性获取下面的参数")
if($sounds.Count -gt 0){
	for ($i = 0; $i -le ($sounds.Count - 1); $i += 1) { 
		[void] $output.add("`t这是您的第$($i+1)块声卡的信息：") 
		[void] $output.add("`t名    称：`t$($sounds[$i].Name)")
		[void] $output.add("`t制 造 商：`t$($sounds[$i].Manufacturer)") 
	}
}
else{
	[void] $output.add("很抱歉，没有找到任何声卡……")
}
[void] $output.add("`n")


# 5、获取显卡信息
#	参考：https://docs.microsoft.com/zh-cn/windows/win32/cimwin32prov/win32-videocontroller
$nvdia = Get-WmiObject -Class Win32_VideoController -ComputerName. | Select-Object -Property *

$nvdias = [System.Collections.ArrayList]::new()
if ($nvdia -is [array]){
	$nvdias = $nvdia;
}else{
	[void] $nvdias.add($nvdia)
}

[void] $output.add("--------------> 显卡`t Win32_VideoController ---------------------------------------------")
[void] $output.add("`t说明：分别在 Name 、 DeviceID 、 Description 、 DriverDate 、 DriverVersion   属性获取下面的参数")
if($nvdias.Count -gt 0){
	for ($i = 0; $i -le ($nvdias.Count - 1); $i += 1) {
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
[void] $output.add("`n")


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

[void] $output.add("--------------> 网卡`t Get-NetAdapter ---------------------------------------------")
[void] $output.add("`t说明-网卡：分别在 ifName 、 ifDesc 、 MediaConnectionState 、 MacAddress 属性获取下面的参数")
[void] $output.add("`t说明-驱动：分别在 DriverFileName 、 DriverProvider 、 DriverVersion 、 DriverInformation 、 DriverDescription  属性获取下面的参数")
if($netAdapters.Count -gt 0){
	for ($i = 0; $i -le ($netAdapters.Count - 1); $i += 1) {
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