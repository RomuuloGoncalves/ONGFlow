# Habilita a parada do script em caso de erro, similar ao 'set -e' do Bash.
$ErrorActionPreference = "Stop"

Write-Host "1. Sincronizando com o repositório remoto (git pull)..." -ForegroundColor Cyan
git pull

$gitStatus = git status --porcelain
if ($gitStatus) {
    Write-Host "`nModificações detectadas. Iniciando processo de commit e push..." -ForegroundColor Yellow

    if ($args.Count -eq 0) {
        Write-Host "`nErro: Modificações foram detectadas, você precisa fornecer uma mensagem de commit." -ForegroundColor Red
        Write-Host "Uso: .\sync-git.ps1 `"Sua mensagem de commit`""
        exit 1
    }

    $commitMessage = $args[0]

    Write-Host "2. Adicionando todos os arquivos modificados (git add .)..." -ForegroundColor Cyan
    git add .

    Write-Host "3. Fazendo o commit com a mensagem: `"$commitMessage`"..." -ForegroundColor Cyan
    git commit -m "$commitMessage"

    Write-Host "4. Enviando as alterações para o repositório remoto (git push)..." -ForegroundColor Cyan
    git push

    Write-Host "`nAlterações enviadas com sucesso!" -ForegroundColor Green
}
else {
    Write-Host "`nNenhuma alteração detectada. O repositório já está sincronizado." -ForegroundColor Green
}

Write-Host "`nProcesso concluído!" -ForegroundColor Green
