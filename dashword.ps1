<#
dashword.ps1
Muestra en consola un dashboard sencillo que verifica el estado de las URLs del proyecto.
Uso:
  .\dashword.ps1            # loop continuo cada 5s
  .\dashword.ps1 -Interval 10    # refresca cada 10s
  .\dashword.ps1 -Once      # solo una iteración

Comprueba:
  - Frontend: http://localhost:3000
  - Backend health: http://localhost:5000/api/health
  - MongoDB: TCP en localhost:27017
#>

param(
    [int]$Interval = 5,
    [switch]$Once
)

function Get-HttpStatus {
    param(
        [string]$Url,
        [int]$TimeoutSec = 5
    )
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    try {
        $resp = Invoke-WebRequest -Uri $Url -TimeoutSec $TimeoutSec -UseBasicParsing -ErrorAction Stop
        $stopwatch.Stop()
        return [pscustomobject]@{
            Ok = $true
            Status = ($resp.StatusCode -as [int]) -or 200
            TimeMs = $stopwatch.ElapsedMilliseconds
            Message = $null
        }
    } catch {
        $stopwatch.Stop()
        return [pscustomobject]@{
            Ok = $false
            Status = $null
            TimeMs = $stopwatch.ElapsedMilliseconds
            Message = $_.Exception.Message
        }
    }
}

function Get-TcpStatus {
    param(
        [string]$HostName = 'localhost',
        [int]$Port = 27017,
        [int]$TimeoutSec = 3
    )
    try {
        $result = Test-NetConnection -ComputerName $HostName -Port $Port -WarningAction SilentlyContinue
        return [pscustomobject]@{
            Ok = ($result.TcpTestSucceeded -eq $true)
            TimeMs = 0
            Message = if ($result.TcpTestSucceeded) { $null } else { 'No TCP connection' }
        }
    } catch {
        return [pscustomobject]@{
            Ok = $false
            TimeMs = 0
            Message = $_.Exception.Message
        }
    }
}

function Render-Row {
    param(
        [string]$Name,
        [bool]$Ok,
        [int]$TimeMs,
        [string]$Info
    )
    if ($Ok) { $icon = '●'; $color = 'Green'; $statusText = 'UP' } else { $icon = '○'; $color = 'Red'; $statusText = 'DOWN' }
    $timeStr = if ($TimeMs -gt 0) { "$TimeMs ms" } else { "-" }
    Write-Host "  $icon" -NoNewline -ForegroundColor $color
    Write-Host "  $Name" -NoNewline
    Write-Host "`tStatus:" -NoNewline
    Write-Host $statusText -ForegroundColor $color -NoNewline
    Write-Host "`tLatency: $timeStr`t$Info"
}

# URLs a comprobar (modificar si es necesario)
$services = @(
    @{ Name = 'Frontend'; Type = 'http'; Url = 'http://localhost:3000' },
    @{ Name = 'Backend';  Type = 'http'; Url = 'http://localhost:5000/api/health' },
    @{ Name = 'MongoDB';  Type = 'tcp';  Host = 'localhost'; Port = 27017 }
)

do {
    Clear-Host
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    Write-Host "════════════════════════════════════════════════════════════════════════" -ForegroundColor Cyan
    Write-Host "  DASHWORD - Estado del proyecto    ($ts)" -ForegroundColor Cyan
    Write-Host "════════════════════════════════════════════════════════════════════════`n" -ForegroundColor Cyan

    foreach ($s in $services) {
        if ($s.Type -eq 'http') {
            $res = Get-HttpStatus -Url $s.Url -TimeoutSec 5
            $info = "URL: $($s.Url)"
            Render-Row -Name $s.Name -Ok $res.Ok -TimeMs $res.TimeMs -Info $info
        } elseif ($s.Type -eq 'tcp') {
            $res = Get-TcpStatus -Host $s.Host -Port $s.Port
            $info = "Host: $($s.Host):$($s.Port)"
            Render-Row -Name $s.Name -Ok $res.Ok -TimeMs $res.TimeMs -Info $info
        }
    }

    Write-Host "`nPresiona Ctrl+C para salir. Actualiza cada $Interval segundos." -ForegroundColor DarkGray

    if ($Once) { break }
    Start-Sleep -Seconds $Interval
} while ($true)

# Fin
