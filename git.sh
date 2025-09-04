#!/bin/bash

set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}1. Sincronizando com o repositório remoto (git pull)...${NC}"
git pull

if [[ -n $(git status --porcelain) ]]; then
  echo -e "\n${YELLOW}Modificações detectadas. Iniciando processo de commit e push...${NC}"

  if [ -z "$1" ]; then
    echo -e "${RED}Erro: Modificações foram detectadas, você precisa fornecer uma mensagem de commit.${NC}"
    echo "Uso: $0 \"Sua mensagem de commit\""
    exit 1
  fi

  COMMIT_MESSAGE="$1"

  echo -e "${CYAN}2. Adicionando todos os arquivos modificados (git add .)...${NC}"
  git add .

  echo -e "${CYAN}3. Fazendo o commit com a mensagem: \"$COMMIT_MESSAGE\"...${NC}"
  git commit -m "$COMMIT_MESSAGE"

  echo -e "${CYAN}4. Enviando as alterações para o repositório remoto (git push)...${NC}"
  git push

  echo -e "\n${GREEN}Alterações enviadas com sucesso!${NC}"
else
  echo -e "\n${GREEN}Nenhuma alteração detectada. O repositório já está sincronizado.${NC}"
fi

echo -e "\n${GREEN}Processo concluído!${NC}"