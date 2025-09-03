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

echo "2. Adicionando todos os arquivos modificados (git add .)..."
git add .

echo "3. Fazendo o commit com a mensagem: \"$COMMIT_MESSAGE\"..."
git commit -m "$COMMIT_MESSAGE"

echo "4. Enviando as alterações para o repositório remoto (git push)..."
git push

echo -e "\nProcesso concluído com sucesso!"