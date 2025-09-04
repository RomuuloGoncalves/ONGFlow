#!/bin/bash

set -e

if [ -z "$1" ]; then
  echo "Erro: Você precisa fornecer uma mensagem de commit."
  echo "Uso: $0 \"Sua mensagem de commit\""
  exit 1
fi

COMMIT_MESSAGE="$1"

echo "1. Sincronizando com o repositório remoto (git pull)..."
git pull

if [[ -n $(git status --porcelain) ]]; then
  echo -e "\nModificações detectadas. Iniciando processo de commit e push..."

  echo "2. Adicionando todos os arquivos modificados (git add .)..."
  git add .

  echo "3. Fazendo o commit com a mensagem: \"$COMMIT_MESSAGE\"..."
  git commit -m "$COMMIT_MESSAGE"

  echo "4. Enviando as alterações para o repositório remoto (git push)..."
  git push

  echo -e "\nAlterações enviadas com sucesso!"
else
  echo -e "\nNenhuma alteração detectada. O repositório já está sincronizado."
fi

echo -e "\nProcesso concluído!"