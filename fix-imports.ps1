# Hitta alla TypeScript filer
$tsFiles = Get-ChildItem -Path "api/src" -Filter "*.ts" -Recurse

Write-Host "🔍 Hittade $($tsFiles.Count) TypeScript filer" -ForegroundColor Green

foreach ($file in $tsFiles) {
    Write-Host "📝 Processar: $($file.FullName)" -ForegroundColor Yellow
    
    # Läs filinnehåll
    $content = Get-Content $file.FullName -Raw
    $originalContent = $content
    
    # Regex patterns för olika import-typer
    $patterns = @(
        # import Something from "./path"
        'import\s+([^"'']+)\s+from\s+["\'](\.[^"'']+)["\']',
        # import { Something } from "./path"  
        'import\s*\{\s*([^}]+)\s*\}\s*from\s+["\'](\.[^"'']+)["\']',
        # import * as Something from "./path"
        'import\s*\*\s*as\s+([^"'']+)\s+from\s+["\'](\.[^"'']+)["\']',
        # import "./path" (side effects)
        'import\s+["\'](\.[^"'']+)["\']'
    )
    
    foreach ($pattern in $patterns) {
        $content = [regex]::Replace($content, $pattern, {
            param($match)
            
            $fullMatch = $match.Value
            $groups = $match.Groups
            
            # Hitta path-gruppen (olika position beroende på pattern)
            $pathGroup = $null
            for ($i = 1; $i -lt $groups.Count; $i++) {
                if ($groups[$i].Value.StartsWith('.')) {
                    $pathGroup = $groups[$i]
                    break
                }
            }
            
            if ($pathGroup -and -not $pathGroup.Value.EndsWith('.js')) {
                # Ersätt path med .js tillagd
                $newPath = $pathGroup.Value + '.js'
                $newMatch = $fullMatch.Replace($pathGroup.Value, $newPath)
                Write-Host "  ✅ $($pathGroup.Value) → $newPath" -ForegroundColor Cyan
                return $newMatch
            }
            
            return $fullMatch
        })
    }
    
    # Skriv tillbaka bara om något ändrats
    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  💾 Uppdaterad!" -ForegroundColor Green
    } else {
        Write-Host "  ⏭️  Inga ändringar behövs" -ForegroundColor Gray
    }
}

Write-Host "`n🎉 Klart! Alla imports är nu fixade." -ForegroundColor Green
Write-Host "📋 Kör nu: npm run build" -ForegroundColor Yellow